import { BrowserRouter } from 'react-router-dom'

import { EditProfileForm } from '@/pages/auth/editProfile/editProfileForm/editProfileForm'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: EditProfileForm,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Auth/EditProfile/EditProfileForm',
} satisfies Meta<typeof EditProfileForm>

export default meta
type Story = StoryObj<typeof meta>

export const EditProfileFormExample: Story = {
  args: {},
  render: () => {
    return (
      <>
        <EditProfileForm />
      </>
    )
  },
}
