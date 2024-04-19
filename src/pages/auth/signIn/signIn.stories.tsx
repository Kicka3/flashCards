import { SignIn } from '@/pages/auth/signIn/signIn'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: SignIn,
  tags: ['autodocs'],
  title: 'Auth/SignIn',
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const ExampleSignIn: Story = {
  args: {
    children: 'TEST COMPONENT',
  },
  render: () => {
    return <SignIn />
  },
}
