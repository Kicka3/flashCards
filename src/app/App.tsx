import { Provider } from 'react-redux'

import { Router } from '@/app/router'
import { store } from '@/services/store'
import { SpeedInsights } from '@vercel/speed-insights/next'

export function App() {
  return (
    <Provider store={store}>
      <Router />
      <SpeedInsights />
    </Provider>
  )
}
