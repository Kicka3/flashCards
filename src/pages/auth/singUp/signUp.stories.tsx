import { SignUp } from '@/pages/auth/singUp/signUp'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: SignUp,
  tags: ['autodocs'],
  title: 'Auth/SignUp',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const SignUpTest: Story = {
  args: {
    children: 'TEST COMPONENT',
  },
}
