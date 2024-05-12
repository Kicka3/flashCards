import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

import { Cards } from '.'

const meta = {
  argTypes: {},
  component: Cards,
  decorators: [
    Story => (
      <MemoryRouter>
        <Provider store={store}>
          <Story />
        </Provider>
      </MemoryRouter>
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
    return <Cards />
  },
}
