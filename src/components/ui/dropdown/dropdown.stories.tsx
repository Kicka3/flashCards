import type { Meta, StoryObj } from '@storybook/react'

import { DropdownMenu } from '@/components/ui/dropdown/dropdownMenu'

const meta = {
  argTypes: {},
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownDefault: Story = {
  args: {},
}
