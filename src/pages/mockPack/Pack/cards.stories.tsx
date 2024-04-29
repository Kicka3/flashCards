import { BrowserRouter } from 'react-router-dom'

import Layout from '@/app/layout/layout'
import { Meta, StoryObj } from '@storybook/react'

import { Cards } from '.'

const meta = {
  argTypes: {},
  component: Cards,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Pages/Cards',
} satisfies Meta<typeof Cards>

export default meta
type Story = StoryObj<typeof meta>

export const MockPackDefault: Story = {
  args: {},
  render: () => {
    return (
      <Layout>
        <Cards />
      </Layout>
    )
  },
}
