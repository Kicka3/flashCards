import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Profile } from '@/pages/auth/profile/Profile'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: Profile,
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
  title: 'Auth/Profile',
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof meta>

export const ProfileDefault: Story = {
  args: {},
  render: () => {
    return (
      <>
        <Profile />
      </>
    )
  },
}
