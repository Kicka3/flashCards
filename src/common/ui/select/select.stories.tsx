import type { Meta, StoryObj } from '@storybook/react'

import { Select, SelectItem } from '.'

const meta = {
  argTypes: {},
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: (
      <>
        <SelectItem value={'1'}>1 item</SelectItem>
        <SelectItem value={'2'}>2 item</SelectItem>
      </>
    ),
    disabled: false,
    label: 'Select',
    placeholder: 'placeholder',
  },
}

export const SelectDisabled: Story = {
  args: {
    children: (
      <>
        <SelectItem value={'1'}>1 item</SelectItem>
        <SelectItem value={'2'}>2 item</SelectItem>
      </>
    ),
    disabled: true,
    label: 'Select',
    placeholder: 'placeholder',
  },
}
