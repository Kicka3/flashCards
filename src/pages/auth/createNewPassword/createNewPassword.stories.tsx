import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { CreateNewPassword } from '@/pages/auth/createNewPassword/createNewPassword'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: CreateNewPassword,
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
  title: 'Auth/CreateNewPassword',
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const CreateNewPasswordDefault: Story = {
  args: {},
  render: () => {
    return (
      <>
        <CreateNewPassword />
      </>
    )
  },
}
