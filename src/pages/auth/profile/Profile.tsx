import { ProfileInfo } from '@/pages/auth/editProfile/ProfileInfo'
import { UpdateUserFormValues } from '@/pages/auth/editProfile/editProfileWithInput/utils/editWithInputSchema'
import { UpdateAvatarFormValues } from '@/pages/auth/editProfile/editProfileWithoutInput/utils/editWithoutInputSchema'
import { useMeQuery, useUpdateUserMutation } from '@/services/auth'

export const Profile = ({}) => {
  const { data } = useMeQuery()
  const [updateProfile] = useUpdateUserMutation()

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

  return (
    <>
      <ProfileInfo data={data} updateAvatar={updateAvatar} updateNickname={updateNickname} />
    </>
  )
}
