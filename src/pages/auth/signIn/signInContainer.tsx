import { toast } from 'react-toastify'

import { SignIn } from '@/pages/auth/signIn/signIn'
import { FormValues } from '@/pages/auth/signIn/utils'
import { useLoginMutation } from '@/services/auth'

export const SignInContainer = () => {
  const [login] = useLoginMutation()

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data).unwrap()
    } catch (error: any) {
      toast.error(error?.data?.message ?? 'Some errors occurred while sign in')
    }
  }

  return <SignIn onSubmit={onSubmit} />
}
