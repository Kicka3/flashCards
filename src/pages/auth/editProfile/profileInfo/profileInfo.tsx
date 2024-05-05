import { useState } from 'react'

import { Typography } from '@/common/ui'
import { Card } from '@/common/ui/card'
import { AvatarEditor } from '@/pages/auth/editProfile/avatarEditor'
import { EditProfileWithInput } from '@/pages/auth/editProfile/editProfileWithInput'
import { UpdateUserFormValues } from '@/pages/auth/editProfile/editProfileWithInput/utils/editWithInputSchema'
import {
  DataProps,
  EditProfileWithoutInput,
} from '@/pages/auth/editProfile/editProfileWithoutInput'
import { UpdateAvatarFormValues } from '@/pages/auth/editProfile/editProfileWithoutInput/utils/editWithoutInputSchema'

export type Props = {
  className?: string
  data: DataProps
  logout: () => void
  updateAvatar: (avatar: UpdateAvatarFormValues) => Promise<void>
  updateNickname: (name: UpdateUserFormValues) => void
}

export const ProfileInfo = ({ data, logout, updateAvatar, updateNickname }: Props) => {
  const [editMode, setEditMode] = useState(false)

  const updateAvatarUrl = async (url: string): Promise<string> => {
    return url
  }

  return (
    <Card>
      <Typography as={'h1'} variant={'h1'}>
        Personal Information
      </Typography>
      <AvatarEditor
        avatar={data.avatar}
        onAvatarChange={() => updateAvatar({ avatar: data.avatar })}
        updateAvatar={updateAvatarUrl}
      />
      {editMode ? (
        <EditProfileWithInput
          setEditMode={setEditMode}
          updateNickname={() => updateNickname({ name: data.name })}
        />
      ) : (
        <EditProfileWithoutInput
          email={data.email}
          logout={logout}
          name={data.name}
          setEditMode={setEditMode}
        />
      )}
    </Card>
  )
}
