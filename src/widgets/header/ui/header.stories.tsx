import { Meta, StoryObj } from '@storybook/react'

import Header from './header'

const meta = {
  argTypes: {},
  component: Header,
  tags: ['autodocs'],
  title: 'Widget/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const SimpleCard: Story = {}

export const HeaderDefault: Story = {}
