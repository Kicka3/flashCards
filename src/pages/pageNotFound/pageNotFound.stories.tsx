import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

import { PageNotFound } from '.'

const meta = {
  argTypes: {},
  component: PageNotFound,
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
  title: 'Pages/PageNotFound',
} satisfies Meta<typeof PageNotFound>

export default meta
type Story = StoryObj<typeof meta>

export const PageNotFoundDefault: Story = {
  args: {},
  render: () => {
    return <PageNotFound />
  },
}
