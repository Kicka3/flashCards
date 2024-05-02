import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Typography } from '@/common/ui'
import { DeckHeader } from '@/pages/decks/decks-table/deckHeader/deckHeader'
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
  title: 'Pages/Decks',
} satisfies Meta<typeof DeckHeader>

export default meta
type Story = StoryObj<typeof meta>

export const DeckHeaderStoryDemo: Story = {
  args: {
    isLoading: false,
  },
  render: ({ isLoading }) => {
    if (isLoading) {
      return <Typography variant={'h1'}>LOADING...</Typography>
    }

    return <DeckHeader {...DeckHeaderStoryDemo.args} />
  },
}
