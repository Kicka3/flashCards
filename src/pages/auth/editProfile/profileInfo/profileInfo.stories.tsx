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
    updateAvatar: async ({ avatar }: { avatar: string }): Promise<void> => {
      console.log('Updating avatar:', avatar)
    },
    updateNickname: async ({ name }: { name: string }): Promise<void> => {
      console.log('Updating nickname:', name)
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
