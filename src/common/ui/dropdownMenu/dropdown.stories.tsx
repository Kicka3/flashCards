import type { Meta, StoryObj } from '@storybook/react'

import { DropDownMenu } from '@/common/ui/dropdownMenu/dropdownMenu'
import { IconDropDown } from '@/layout/header/ui/icon-dropdown/iconDropdown'
import { UserDropDown } from '@/layout/header/ui/user-dropdown/userDropdown'

const meta = {
  argTypes: {},
  component: DropDownMenu,
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownWithAvatar: Story = {
  args: {},
  render: () => {
    const user = {
      description: 'User Icon',
      email: 'example@example.com',
      img: 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png',
      name: 'George',
    }

    return (
      <>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <UserDropDown
            description={user.description}
            email={user.email}
            img={user.img}
            name={user.name}
          />
        </div>
      </>
    )
  },
}

export const DropdownWithIcons: Story = {
  args: {},

  render: () => {
    return (
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        <IconDropDown />
      </div>
    )
  },
}
