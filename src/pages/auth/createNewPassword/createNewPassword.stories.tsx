import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { CreateNewPasswordContainer } from '@/pages/auth/createNewPassword/createNewPasswordContainer'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  component: CreateNewPasswordContainer,
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
  title: 'Auth/CreateNewPassword',
} satisfies Meta<typeof CreateNewPasswordContainer>

export default meta
type Story = StoryObj<typeof meta>

export const CreateNewPasswordDefault: Story = {
  args: {},
  render: () => {
    return (
      <>
        <CreateNewPasswordContainer />
      </>
    )
  },
}
