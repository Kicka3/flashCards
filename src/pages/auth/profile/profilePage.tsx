import { useNavigate } from 'react-router-dom'

import { UpdateUserFormValues } from '@/pages/auth/editProfile/editProfileWithInput/utils/editWithInputSchema'
import { ProfileInfo } from '@/pages/auth/editProfile/profileInfo/profileInfo'
import { useLogoutMutation, useMeQuery, useUpdateUserMutation } from '@/services/auth'

export const ProfilePage = ({}) => {
  const { data } = useMeQuery()
  const [updateProfile] = useUpdateUserMutation()
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()

  const updateAvatar = async (avatar: File) => {
    if (!data) {
      return
    }

    const formData = new FormData()

    formData.append('avatar', avatar)

    const updateProfilePromise = updateProfile(formData).unwrap()

    await updateProfilePromise
  }

  const updateNickname = async (formValues: UpdateUserFormValues) => {
    if (!data) {
      return
    }

    const formData = new FormData()

    formData.append('name', formValues.name)
    const updateProfilePromise = updateProfile(formData).unwrap()

    await updateProfilePromise
  }

  if (!data) {
    return null
  }

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      navigate('/signIn')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <>
      <ProfileInfo
        data={data}
        logout={handleLogout}
        updateAvatar={updateAvatar}
        updateNickname={updateNickname}
      />
    </>
  )
}
