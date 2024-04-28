import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '.'

const meta = {
  argTypes: {},
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const options = ['1', '2', '3', '4']

export const Primary: Story = {
  args: {
    options: options,
    placeholder: 'placeholder',
  },
}
export const WithDefaultValue: Story = {
  args: {
    defaultValue: options[0],
    options: options,
    placeholder: 'placeholder',
  },
}
export const WithLabel: Story = {
  args: {
    defaultValue: String(options[0]),
    label: 'label',
    options: options,
    placeholder: 'placeholder',
  },
}

export const SelectDisabled: Story = {
  args: {
    defaultValue: String(options[0]),
    disabled: true,
    label: 'label',
    options: options,
    placeholder: 'placeholder',
  },
}
