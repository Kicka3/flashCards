import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Typography } from '@/common/ui/typography'
import { DeckHeader } from '@/pages/decks/ui/deckHeader/deckHeader'
import { store } from '@/services/store'

const meta = {
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
    tabs: [
      { title: 'Pro100', value: 'Pro100' },
      { title: 'H3LL0', value: 'hello' },
    ],
  },
  render: ({ isLoading }) => {
    if (isLoading) {
      return <Typography variant={'h1'}>LOADING...</Typography>
    }

    return <DeckHeader {...DeckHeaderStoryDemo.args} />
  },
}
