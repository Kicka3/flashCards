import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { ForgotPassword } from '@/pages/auth/forgotPasword/forgotPassword'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: ForgotPassword,
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
  title: 'Auth/ForgotPassword',
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPasswordDefault: Story = {
  args: {},
  render: () => {
    return (
      <>
        <ForgotPassword />
      </>
    )
  },
}
