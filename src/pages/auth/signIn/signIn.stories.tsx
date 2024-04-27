import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { SignIn } from '@/pages/auth/signIn/signIn'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

// async function enableMocking() {
//   if (process.env.NODE_ENV !== 'development') {
//     return
//   }
//
//   const { worker } = await import('../../../services/mocks/browser')
//
//   // `worker.start()` returns a Promise that resolves
//   // once the Service Worker is up and ready to intercept requests.
//   return worker.start()
// }

const meta = {
  argTypes: {},
  component: SignIn,
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
  title: 'Auth/SignIn',
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const ExampleSignIn: Story = {
  args: {
    children: 'TEST COMPONENT',
  },
  render: () => {
    return <SignIn />
  },
}

// const meta = {
//   argTypes: {},
//   component: SignIn,
//   decorators: [
//     Story => (
//       <BrowserRouter>
//         <Provider store={store}>
//           <Story />
//         </Provider>
//       </BrowserRouter>
//     ),
//   ],
//   tags: ['autodocs'],
//   title: 'Auth/SignIn',
// } satisfies Meta<typeof SignIn>
//
// export default meta
// type Story = StoryObj<typeof meta>
//
// export const ExampleSignIn: Story = {
//   args: {
//     children: 'TEST COMPONENT',
//   },
//   render: () => {
//     return <SignIn />
//   },
// }
