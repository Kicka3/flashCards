import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { DeleteForm } from '@/features/deck/deleteForm/deleteForm'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta = {
  argTypes: {
    isDeck: { action: 'boolean' },
    isOpen: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
    title: { control: 'text' },
  },
  component: DeleteForm,
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
  title: 'Feature/DeleteForm',
} satisfies Meta<typeof DeleteForm>

export default meta
type Story = StoryObj<typeof meta>

export const DeleteDeckForm: Story = {
  args: {
    close: fn(),
    deleteAction: fn(),
    id: 'example',
    isDeck: true,
    isOpen: true,
    name: 'Card Name',
    onOpenChange: fn(),
    title: 'Do u really wanna delete me?',
  },
  render: args => {
    return <DeleteForm {...args} />
  },
}
