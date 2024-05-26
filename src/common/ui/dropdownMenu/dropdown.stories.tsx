import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { DropDownMenu } from '@/common/ui/dropdownMenu/dropdownMenu'
import { store } from '@/services/store'
import { IconDropDown } from '@/widgets/icon-dropdown'
import { UserDropDown } from '@/widgets/user-dropdown'

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
  decorators: [
    Story => (
      <MemoryRouter>
        <Provider store={store}>
          <Story />
        </Provider>
      </MemoryRouter>
    ),
  ],
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
        isOpen
        name={user.name}
        toggleDropdown={() => {}}
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
    const deck = {
      author: { id: 'string', name: 'string' },
      cardsCount: 0,
      cover: 'string',
      created: 'string',
      id: 'string',
      isPrivate: false,
      name: 'string',
      updated: 'string',
      userId: 'string',
    }

    return <IconDropDown deck={deck} />
  },
}
