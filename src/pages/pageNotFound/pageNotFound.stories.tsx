import { BrowserRouter } from 'react-router-dom'

import Layout from '@/layout/header/layout'
import { Meta, StoryObj } from '@storybook/react'

import PageNotFound from './pageNotFound'

const meta = {
  argTypes: {},
  component: PageNotFound,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
  title: 'Pages/PageNotFound',
} satisfies Meta<typeof PageNotFound>

export default meta
type Story = StoryObj<typeof meta>

export const PageNotFoundDefault: Story = {
  args: {},
  render: () => {
    return (
      <Layout>
        <PageNotFound />
      </Layout>
    )
  },
}
