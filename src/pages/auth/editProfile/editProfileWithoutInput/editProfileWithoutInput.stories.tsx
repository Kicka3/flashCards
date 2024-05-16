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
    avatar: 'https://dz2cdn1.dzone.com/storage/user-avatar/534373-thumb.jpg',
    email: 'example123@gmail.com',
    logout: () => console.log('Logout'),
    name: 'Nick',
    setEditMode: (editMode: boolean) => console.log(`Set edit mode to ${editMode}`),
  },
  render: args => {
    /** fake user data */
    const { avatar, email, logout, name, setEditMode } = args

    return (
      <>
        <EditProfileWithoutInput
          avatar={avatar}
          email={email}
          logout={logout}
          name={name}
          setEditMode={setEditMode}
        />
      </>
    )
  },
}
