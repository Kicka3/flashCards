import type { Meta, StoryObj } from '@storybook/react'

import { Rating } from '.'

const meta = {
  argTypes: {},
  component: Rating,
  decorators: [
    Story => (
      <div style={{ margin: '30px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Rating',
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    rating: 3,
  },
}
