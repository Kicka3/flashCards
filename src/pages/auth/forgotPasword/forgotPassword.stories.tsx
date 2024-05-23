import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { ForgotPasswordContainer } from '@/pages/auth/forgotPasword/forgotPasswordContainer'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: ForgotPasswordContainer,
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
} satisfies Meta<typeof ForgotPasswordContainer>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPasswordDefault: Story = {
  args: {},
  render: () => {
    return (
      <>
        <ForgotPasswordContainer />
      </>
    )
  },
}
