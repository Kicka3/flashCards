import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Typography } from '@/common/ui'
import { DeckHeader } from '@/pages/decks/ui/deckHeader/deckHeader'
import { store } from '@/services/store'
import { fn } from '@storybook/test'

const meta = {
  argTypes: {},
  args: {
    onClick: fn(),
  },
  component: DeckHeader,
  decorators: [
    Story => (
      <BrowserRouter>
        <Provider store={store}>
          <Story />
        </Provider>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Pages/DecksContainer',
} satisfies Meta<typeof DeckHeader>

export default meta
type Story = StoryObj<typeof meta>

export const DeckHeaderStoryDemo: Story = {
  args: {
    isLoading: false,
    search: '',
    setSearch: () => fn,
    setValue: () => fn,
    tabs: [
      { title: 'Pro100', value: 'Pro100' },
      { title: 'H3LL0', value: 'hello' },
    ],
    value: [1],
  },
  render: ({ isLoading }) => {
    if (isLoading) {
      return <Typography variant={'h1'}>LOADING...</Typography>
    }

    return <DeckHeader {...DeckHeaderStoryDemo.args} />
  },
}
