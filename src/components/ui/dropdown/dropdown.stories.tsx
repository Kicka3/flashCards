import type { Meta, StoryObj } from '@storybook/react'

import { IconDropDown } from '@/components/layout/header/icon-dropdown/iconDropdown'
import { UserDropDown } from '@/components/layout/header/user-dropdown/userDropdown'
import { DropdownMenu } from '@/components/ui/dropdown/dropdownMenu'

const meta = {
  argTypes: {},
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof DropdownMenu>

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
