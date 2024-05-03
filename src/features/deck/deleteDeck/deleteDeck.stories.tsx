import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { DeleteDeck } from '@/features/deck/deleteDeck/deleteDeck'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    isDeck: { action: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
    open: { control: 'boolean' },
    title: { control: 'text' },
  },
  component: DeleteDeck,
  decorators: [
    Story => (
      <BrowserRouter>
        <Provider store={store}>
          <Story />
        </Provider>
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Feature/DeleteDeck',
} satisfies Meta<typeof DeleteDeck>

export default meta
type Story = StoryObj<typeof meta>

export const DeleteDeckForm: Story = {
  args: {
    isDeck: true,
    name: 'Card Name',
    onOpenChange: () => {},
    open: true,
    title: 'Do u really wanna delete me?',
  },
  render: args => {
    return <DeleteDeck {...args} />
  },
}
