import { useOutletContext } from 'react-router-dom'

import { UserData } from '@/services/auth'

export type AppOutletContext = {
  isAuth: boolean
  isLoading: boolean
  user: UserData | null
}

export const useAppOutletContext = () => useOutletContext<AppOutletContext>()
