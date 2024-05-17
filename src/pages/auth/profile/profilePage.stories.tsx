import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { ProfilePage } from '@/pages/auth/profile/profilePage'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: ProfilePage,
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
  title: 'Auth/HeaderProfile',
} satisfies Meta<typeof ProfilePage>

export default meta
type Story = StoryObj<typeof meta>

export const ProfileDefault: Story = {
  args: {},
  render: () => {
    return (
      <>
        <ProfilePage />
      </>
    )
  },
}
