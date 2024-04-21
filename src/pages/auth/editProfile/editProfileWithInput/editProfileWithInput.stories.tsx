import { EditProfileWithInput } from '@/pages/auth/editProfile/editProfileWithInput/editProfileWithInput'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: EditProfileWithInput,
  tags: ['autodocs'],
  title: 'Auth/EditProfile/EditProfileWithInput',
} satisfies Meta<typeof EditProfileWithInput>

export default meta
type Story = StoryObj<typeof meta>

export const EditWithInput: Story = {
  args: {
    children: 'TEST COMPONENT',
  },
  render: () => {
    return (
      <>
        <EditProfileWithInput />
      </>
    )
  },
}
