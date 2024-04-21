import { BrowserRouter } from 'react-router-dom'

import { Meta, StoryObj } from '@storybook/react'

import { ForgotPassword } from '.'

const meta = {
  argTypes: {},
  component: ForgotPassword,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
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
