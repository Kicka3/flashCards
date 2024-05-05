import { EditProfileWithInput } from '@/pages/auth/editProfile/editProfileWithInput/editProfileWithInput'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: EditProfileWithInput,
  tags: ['autodocs'],
  title: 'Auth/EditProfile/EditProfileWithInput',
} as Meta<typeof EditProfileWithInput>

export default meta
type Story = StoryObj<typeof meta>

export const EditWithInput: Story = {
  args: {
    setEditMode: () => {},
    updateNickname: () => {},
  },
  render: args => {
    return (
      <>
        <EditProfileWithInput {...args} />
      </>
    )
  },
}
