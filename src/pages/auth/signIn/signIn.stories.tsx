import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { SignInContainer } from '@/pages/auth/signIn/signInContainer'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: SignInContainer,
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
  title: 'Auth/SignIn',
} satisfies Meta<typeof SignInContainer>

export default meta
type Story = StoryObj<typeof meta>

export const ExampleSignIn: Story = {}
