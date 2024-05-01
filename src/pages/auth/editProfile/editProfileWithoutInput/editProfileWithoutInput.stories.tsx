import { EditProfileWithoutInput } from '@/pages/auth/editProfile/editProfileWithoutInput/editProfileWithoutInput'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: EditProfileWithoutInput,
  tags: ['autodocs'],
  title: 'Auth/EditProfile/EditProfileWithoutInput',
} satisfies Meta<typeof EditProfileWithoutInput>

export default meta
type Story = StoryObj<typeof meta>

export const EditProfileTest: Story = {
  args: {
    children: 'TEST COMPONENT',
  },
  render: () => {
    /** fake user data */
    const user = {
      avatar: 'https://dz2cdn1.dzone.com/storage/user-avatar/534373-thumb.jpg',
      email: 'example123@gmail.com',
      name: 'Nick',
    }

    return (
      <>
        <EditProfileWithoutInput avatar={user.avatar} email={user.email} name={user.name} />
      </>
    )
  },
}
