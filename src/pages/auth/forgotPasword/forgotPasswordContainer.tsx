import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/common/enums/enums'
import { ForgotPassword } from '@/pages/auth/forgotPasword/forgotPassword'
import { FormValues } from '@/pages/auth/forgotPasword/utils'
import { RecoverPassword, useRecoverPasswordMutation } from '@/services/auth'
import { render } from '@react-email/render'

import FlashCardsPasswordRecover from '../../../../emails/email'

export const ForgotPasswordContainer = () => {
  const navigate = useNavigate()
  const [forgotPassword] = useRecoverPasswordMutation()

  const html = render(<FlashCardsPasswordRecover />, {
    pretty: true,
  })

  const onSubmit = async ({ email }: FormValues) => {
    const recoverPassword: RecoverPassword = {
      email,
      html: html,
      subject: '',
    }

    try {
      const result = await forgotPassword(recoverPassword).unwrap()

      const promiseResult = Promise.resolve(result)

      await toast.promise(promiseResult, {
        pending: 'Sending email...',
        success: 'Email sent successfully!',
      })

      navigate(ROUTES.CHECK_EMAIL)
    } catch (error: any) {
      toast.error(error?.data?.message ?? 'An error occurred while resetting the password:')
    }
  }

  return <ForgotPassword onSubmit={onSubmit} />
}
