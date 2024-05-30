import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Button } from '@/common/ui/button'
import { DeleteForm } from '@/features/deck/deleteForm/deleteForm'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
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
    id: 'example',
    name: 'Card Name',
    onDeleteDeck: () => {},
    trigger: <Button>open</Button>,
  },
  render: args => {
    return <DeleteForm {...args} />
  },
}
