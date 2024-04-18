import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '@/common/ui/сheckbox/checkbox'

const meta = {
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Сheckbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const CheckboxDefault: Story = {
  args: {
    disabled: false,
  },
}

export const UncheckedCheckboxWithLabel: Story = {
  args: {
    disabled: false,
    text: 'Checked',
  },
}

export const CheckboxColored: Story = {
  args: {
    backgroundColor: 'blue',
    color: 'red',
    defaultChecked: true,
    disabled: false,
    text: 'Checked color',
  },
}

export const CheckboxDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
    text: 'Disabled checked',
  },
}
