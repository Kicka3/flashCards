import { Card } from '@/common/ui/card/card'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const SimpleCard: Story = {}

export const CardWithChildren: Story = {
  args: {
    children: 'Card With Children',
  },
}
