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

import s from './profileInfo.module.scss'

export type Props = {
  className?: string
  data: DataProps
  logout: () => void
  updateAvatar: (avatar: File) => void
  updateNickname: (name: UpdateUserFormValues) => void
}

export const ProfileInfo = ({ data, logout, updateAvatar, updateNickname }: Props) => {
  const [editMode, setEditMode] = useState(false)

  return (
    <Card>
      <Typography as={'h1'} className={s.header} variant={'h1'}>
        Personal Information
      </Typography>
      <AvatarEditor
        avatar={data.avatar}
        editMode={editMode}
        name={data.name}
        updateAvatar={updateAvatar}
      />
      {editMode ? (
        <EditProfileWithInput setEditMode={setEditMode} updateNickname={updateNickname} />
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
