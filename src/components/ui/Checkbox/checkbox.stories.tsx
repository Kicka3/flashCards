import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '.'

const meta = {
  argTypes: {
    //   autoSize: { control: 'boolean' },
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
    //   size: { control: 'number' },
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

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
// export const AutoSizedCheckbox: Story = {
//   args: {
//     autoSize: true,
//     children: 'Checked',
//   },
// }
export const CheckboxColored: Story = {
  args: {
    backgroundColor: 'blue',
    children: 'Checked',
    color: 'red',
  },
}
// export const CheckboxResized: Story = {
//   args: {
//     backgroundColor: 'blue',
//     children: 'Checked',
//     color: 'red',
//     size: 30,
//   },
// }
export const CheckboxDisabled: Story = {
  args: {
    children: 'Checked',
    disabled: true,
  },
}
