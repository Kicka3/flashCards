import { Provider } from 'react-redux'

import { Router } from '@/app/router'
import { Toast } from '@/common/ui/toast'
import { store } from '@/services/store'

export function App() {
  return (
    <Provider store={store}>
      <Router />
      <Toast />
    </Provider>
  )
}
