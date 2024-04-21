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
    return (
      <>
        <EditProfileWithoutInput />
      </>
    )
  },
}
