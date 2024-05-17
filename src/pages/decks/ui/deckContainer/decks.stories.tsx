import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { DecksContainer } from '@/pages/decks/ui/deckContainer/decksContainer'
import { store } from '@/services/store'
import { fn } from '@storybook/test'

import { Loader } from '../../../../common/ui/loader'

const meta = {
  argTypes: {},
  args: {
    onClick: fn(),
  },
  component: DecksContainer,
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
  title: 'Pages/DecksList',
} satisfies Meta<typeof DecksContainer>

export default meta
type Story = StoryObj<typeof meta>

export const DecksStoryDemo: Story = {
  args: {
    isLoading: false,
  },
  render: ({ isLoading }) => {
    if (isLoading) {
      return <Loader />
    }

    return <DecksContainer {...DecksStoryDemo.args} />
  },
}
