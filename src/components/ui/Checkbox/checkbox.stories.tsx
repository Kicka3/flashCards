import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Checkbox } from '.'

const CheckboxWithState = (props: any) => {
  const [checked, setChecked] = useState(false)

  return <Checkbox {...props} checked={checked} onChangeChecked={setChecked} />
}

const meta = {
  argTypes: {
    autoSize: { control: 'boolean' },
    backgroundColor: { control: 'color' },
    checked: { control: 'boolean' },
    color: { control: 'color' },
    size: { control: 'number' },
  },
  component: CheckboxWithState,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof CheckboxWithState>

export default meta
type Story = StoryObj<typeof meta>

export const CheckboxDefault: Story = {
  args: {},
}

export const CheckboxWithLabel: Story = {
  args: {
    children: 'Checked',
  },
}
export const AutoSizedCheckbox: Story = {
  args: {
    autoSize: true,
    children: 'Checked',
  },
}
export const CheckboxColored: Story = {
  args: {
    autoSize: true,
    backgroundColor: 'blue',
    children: 'Checked',
    color: 'red',
  },
}
export const CheckboxResized: Story = {
  args: {
    backgroundColor: 'blue',
    children: 'Checked',
    color: 'red',
    size: 30,
  },
}
export const CheckboxDisabled: Story = {
  args: {
    backgroundColor: 'blue',
    children: 'Checked',
    color: 'red',
    disabled: true,
    size: 30,
  },
}
