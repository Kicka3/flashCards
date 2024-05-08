import { useOutletContext } from 'react-router-dom'

export type AppOutletContext = {
  isAuth: boolean
  isLoading: boolean
}

export const useAppOutletContext = () => useOutletContext<AppOutletContext>()
