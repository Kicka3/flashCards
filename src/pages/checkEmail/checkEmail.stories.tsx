import { BrowserRouter } from 'react-router-dom'

import { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from '.'

const meta = {
  argTypes: {},
  component: CheckEmail,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Auth/CheckEmail',
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const CheckEmailDefault: Story = {
  args: { email: 'mail@mail.com' },
  render: () => {
    return (
      <>
        <CheckEmail email={'mail@mail.com'} />
      </>
    )
  },
}
