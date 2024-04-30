import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Layout from '@/app/layout/layout'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

import { Cards } from '.'

const meta = {
  argTypes: {},
  component: Cards,
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
  title: 'Pages/Cards',
} satisfies Meta<typeof Cards>

export default meta
type Story = StoryObj<typeof meta>

export const CardsDefault: Story = {
  args: {},
  render: () => {
    return (
      <Layout>
        <Cards />
      </Layout>
    )
  },
}
