import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { SignIn } from '@/pages/auth/signIn/signIn'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: SignIn,
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
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const ExampleSignIn: Story = {}
