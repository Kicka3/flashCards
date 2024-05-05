import { useNavigate } from 'react-router-dom'

import { UpdateUserFormValues } from '@/pages/auth/editProfile/editProfileWithInput/utils/editWithInputSchema'
import { UpdateAvatarFormValues } from '@/pages/auth/editProfile/editProfileWithoutInput/utils/editWithoutInputSchema'
import { ProfileInfo } from '@/pages/auth/editProfile/profileInfo/profileInfo'
import { useLogoutMutation, useMeQuery, useUpdateUserMutation } from '@/services/auth'

export const Profile = ({}) => {
  const { data } = useMeQuery()
  const [updateProfile] = useUpdateUserMutation()
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()

  const updateAvatar = async (avatar: UpdateAvatarFormValues) => {
    if (!data) {
      return
    }

    const formData = new FormData()

    formData.append('avatar', avatar.avatar)

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
