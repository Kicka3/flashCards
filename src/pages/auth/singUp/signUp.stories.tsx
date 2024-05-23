import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { SignUpContainer } from '@/pages/auth/singUp/signUpContainer'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: SignUpContainer,
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
} satisfies Meta<typeof SignUpContainer>

export default meta
type Story = StoryObj<typeof meta>

export const SignUpTest: Story = {
  args: {
    children: 'TEST COMPONENT',
  },
  render: () => {
    return (
      <>
        <SignUpContainer />
      </>
    )
  },
}
