import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Slider } from '.'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const SliderDefault: Story = {
  argTypes: {
    minStepsBetweenThumbs: {
      control: {
        type: 'number',
      },
      description: 'minimum steps between thumbs if thumbs more than 1',
    },
  },
  args: {
    value: [25, 75],
  },
  render: () => {
    const [value, setValue] = useState([25, 75])

    return (
      <Slider
        max={100}
        min={0}
        minStepsBetweenThumbs={1}
        onValueChange={(newValue: number[]) => {
          setValue(newValue)
        }}
        step={10}
        value={value}
      />
    )
  },
}
