import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/common/enums/enums'
import { CreateNewPassword } from '@/pages/auth/createNewPassword/createNewPassword'
import { NewPasswordFormValues } from '@/pages/auth/createNewPassword/utils'
import { useResetPasswordMutation } from '@/services/auth'

export const CreateNewPasswordContainer = () => {
  const [resetPassword] = useResetPasswordMutation()
  const { token } = useParams()

  const navigate = useNavigate()

  const onSubmit = async ({ password }: NewPasswordFormValues) => {
    if (token) {
      const resetPasswordResult = resetPassword({ password, token }).unwrap()

      await toast.promise(resetPasswordResult, {
        error: 'Error creating a new password. Please try again.',
        pending: 'Creating a new password...',
        success: 'Password created successfully!',
      })
      await resetPasswordResult
      navigate(ROUTES.SIGN_IN)
    }
  }

  return <CreateNewPassword onSubmit={onSubmit} />
}
