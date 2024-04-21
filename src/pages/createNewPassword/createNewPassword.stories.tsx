import { BrowserRouter } from 'react-router-dom'

import { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from '.'

const meta = {
  argTypes: {},
  component: CreateNewPassword,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
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
