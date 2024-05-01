import type { Meta, StoryObj } from '@storybook/react'

import { DropDownMenu } from '@/common/ui/dropdownMenu/dropdownMenu'
import { IconDropDown } from '@/layout/header/ui/icon-dropdown/iconDropdown'
import { UserDropDown } from '@/layout/header/ui/user-dropdown/userDropdown'

const meta = {
  argTypes: {
    defaultOpen: {
      control: { type: 'button' },
      options: [true, false],
    },
    disabled: {
      control: { type: 'button' },
      options: [true, false],
    },
  },
  component: DropDownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownWithAvatar: Story = {
  args: {
    defaultOpen: true,
    disabled: false,
  },
  render: () => {
    const user = {
      description: 'User Icon',
      email: 'example@example.com',
      img: 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png',
      name: 'George',
    }

    return (
      <UserDropDown
        description={user.description}
        email={user.email}
        img={user.img}
        name={user.name}
      />
    )
  },
}

export const DropdownWithIcons: Story = {
  args: {
    defaultOpen: true,
    disabled: false,
  },

  render: () => {
    return <IconDropDown />
  },
}
