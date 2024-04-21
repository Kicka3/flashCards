import { EditProfile } from '@/pages/auth/editProfile/editProfile'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: EditProfile,
  tags: ['autodocs'],
  title: 'Auth/EditProfile',
} satisfies Meta<typeof EditProfile>

export default meta
type Story = StoryObj<typeof meta>

export const EditProfileTest: Story = {
  args: {
    children: 'TEST COMPONENT',
  },
  render: () => {
    return (
      <>
        <EditProfile />
      </>
    )
  },
}
