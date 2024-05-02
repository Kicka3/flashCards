import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { SignUp } from '@/pages/auth/singUp/signUp'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: SignUp,
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
  title: 'Auth/SignUp',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const SignUpTest: Story = {
  args: {
    children: 'TEST COMPONENT',
  },
  render: () => {
    return (
      <>
        <SignUp />
      </>
    )
  },
}
