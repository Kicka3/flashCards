import { BrowserRouter } from 'react-router-dom'

import Layout from '@/app/layout/layout'
import { Meta, StoryObj } from '@storybook/react'

import { MockPack } from '.'

const meta = {
  argTypes: {},
  component: MockPack,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Pages/MockPack',
} satisfies Meta<typeof MockPack>

export default meta
type Story = StoryObj<typeof meta>

export const MockPackDefault: Story = {
  render: () => {
    return (
      <Layout>
        <MockPack />
      </Layout>
    )
  },
}
