import { ProfileInfo } from '@/pages/auth/editProfile/ProfileInfo'
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
    children: 'TEST COMPONENT',
  },
  render: () => {
    /** fake user data */
    const user = {
      avatar: 'https://dz2cdn1.dzone.com/storage/user-avatar/534373-thumb.jpg',
      email: 'example123@gmail.com',
      name: 'Nick',
    }

    const updateNickname = async ({ name }: { name: string }): Promise<void> => {
      // Implement the logic to update the nickname
      // For example, you might call an API endpoint to update the user's nickname
      console.log('Updating nickname:', name)
    }

    const updateAvatar = async ({ avatar }: { avatar: string }): Promise<void> => {
      // Implement the logic to update the avatar
      // For example, you might call an API endpoint to update the user's avatar
      console.log('Updating avatar:', avatar)
    }

    return (
      <>
        <ProfileInfo data={user} updateAvatar={updateAvatar} updateNickname={updateNickname} />
      </>
    )
  },
}
