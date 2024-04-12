import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from '.'

const meta = {
  argTypes: {},
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const RadioGroupDefault: Story = {
  args: { options: [] },
  render: () => {
    const options: string[] = ['']

    return <RadioGroup options={options} />
  },
}
export const RadioGroupMarked: Story = {
  args: { options: [] },
  render: () => {
    const options: string[] = ['']

    return <RadioGroup defaultValue={options[0]} options={options} />
  },
}
export const RadioGroupWithLabel: Story = {
  args: { options: [] },
  render: () => {
    const options: string[] = ['RadioGroup1', 'RadioGroup2', 'RadioGroup3', 'RadioGroup4']

    return <RadioGroup defaultValue={options[0]} options={options} />
  },
}
export const RadioGroupDisabled: Story = {
  args: { options: [] },
  render: () => {
    const options: string[] = ['RadioGroup4', 'RadioGroup5', 'RadioGroup6', 'RadioGroup7']

    return <RadioGroup defaultValue={options[0]} disabled options={options} />
  },
}
