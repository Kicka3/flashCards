import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup, RadioItem } from '.'

const meta = {
  argTypes: {},
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const RadioGroupDefault: Story = {
  args: {},
  render: () => {
    const options: string[] = ['']

    return (
      <RadioGroup>
        {options.map(i => (
          <RadioItem key={i} label={i} value={i} />
        ))}
      </RadioGroup>
    )
  },
}
export const RadioGroupMarked: Story = {
  args: {},
  render: () => {
    const options: string[] = ['']

    return (
      <RadioGroup defaultValue={options[0]}>
        {options.map(i => (
          <RadioItem key={i} label={i} value={i} />
        ))}
      </RadioGroup>
    )
  },
}
export const RadioGroupWithLabel: Story = {
  args: {},
  render: () => {
    const options: string[] = ['RadioGroup1', 'RadioGroup2', 'RadioGroup3', 'RadioGroup4']

    return (
      <RadioGroup defaultValue={options[0]}>
        {options.map(i => (
          <RadioItem key={i} label={i} value={i} />
        ))}
      </RadioGroup>
    )
  },
}
export const RadioGroupDisabled: Story = {
  args: {},
  render: () => {
    const options: string[] = ['RadioGroup4', 'RadioGroup5', 'RadioGroup6', 'RadioGroup7']

    return (
      <RadioGroup defaultValue={options[0]} disabled>
        {options.map(i => (
          <RadioItem key={i} label={i} value={i} />
        ))}
      </RadioGroup>
    )
  },
}
