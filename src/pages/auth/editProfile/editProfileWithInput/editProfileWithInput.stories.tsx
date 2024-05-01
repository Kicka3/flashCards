import { EditProfileWithInput } from '@/pages/auth/editProfile/editProfileWithInput/editProfileWithInput'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: EditProfileWithInput,
  tags: ['autodocs'],
  title: 'Auth/EditProfile/EditProfileWithInput',
} satisfies Meta<typeof EditProfileWithInput>

export default meta
type Story = StoryObj<typeof meta>

export const EditWithInput: Story = {
  args: {
    avatar: 'TEST',
  },
  render: () => {
    const avatar = 'https://dz2cdn1.dzone.com/storage/user-avatar/534373-thumb.jpg'

    return (
      <>
        <EditProfileWithInput avatar={avatar} />
      </>
    )
  },
}
