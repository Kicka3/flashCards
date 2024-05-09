import { ProfileInfo } from '@/pages/auth/editProfile/profileInfo/profileInfo'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: ProfileInfo,
  tags: ['autodocs'],
  title: 'Auth/EditProfile/ProfileInfo',
} satisfies Meta<typeof ProfileInfo>

export default meta
type Story = StoryObj<typeof meta>

export const EditProfileTest: Story = {
  args: {
    data: {
      avatar: 'https://dz2cdn1.dzone.com/storage/user-avatar/534373-thumb.jpg',
      email: 'example123@gmail.com',
      name: 'Nick',
    },
    logout: () => {
      console.log('Logging out')
    },
    updateAvatar: (avatar: File): void => {
      console.log('Updating avatar:', avatar)
    },
    updateNickname: (name: { name: string }): void => {
      console.log('Updating nickname:', name.name)
    },
  },
  render: args => {
    return (
      <>
        <ProfileInfo {...args} />
      </>
    )
  },
}
