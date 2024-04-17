import { Router } from '@/app/router'
import Header from '@/widgets/header/ui/header'

import Layout from './layout/layout'

export function App() {
  return (
    <Layout>
      <Header isAuth />
      <Router />
    </Layout>
  )
}
