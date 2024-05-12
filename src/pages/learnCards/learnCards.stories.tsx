import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

import { LearnCards } from '.'

const meta = {
  argTypes: {},
  component: LearnCards,
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
  title: 'Pages/LearnCards',
} satisfies Meta<typeof LearnCards>

export default meta
type Story = StoryObj<typeof meta>

export const CardsDefault: Story = {
  args: {},
  render: () => {
    return <LearnCards />
  },
}
