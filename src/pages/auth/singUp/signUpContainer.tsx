import { toast } from 'react-toastify'

import { SignUp } from '@/pages/auth/singUp/signUp'
import { FormValues } from '@/pages/auth/singUp/utils'
import { useSignUpMutation } from '@/services/auth'

export const SignUpContainer = () => {
  const [signUp] = useSignUpMutation()
  const onSubmit = async (data: FormValues) => {
    try {
      const result = await signUp(data).unwrap()
      const promiseResult = Promise.resolve(result)

      await toast.promise(promiseResult, {
        pending: 'Creating account...',
        success: 'Account created successfully!',
      })
    } catch (error: any) {
      toast.error(error?.data?.message ?? 'Some errors occurred while sign up')
    }
  }

  return <SignUp onSubmit={onSubmit} />
}
