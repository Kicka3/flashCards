import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '.'

const meta = {
  argTypes: {},
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const RadioGroupDefault: Story = {
  args: {},
  render: () => {
    return <Pagination />
  },
}
