import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Layout from '@/app/layout/layout'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

import { MockPack } from '.'

const meta = {
  argTypes: {},
  component: MockPack,
  decorators: [
    Story => (
      <BrowserRouter>
        <Provider store={store}>
          <Story />
        </Provider>
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
