import { useEffect, useRef, useState } from 'react'

import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import { Button } from '@/common/ui/button'
import { handleFileChange } from '@/pages/auth/editProfile/profileInfo/utils/fileChange'

import s from './avatarEditor.module.scss'

interface AvatarEditorProps {
  avatar: string
  editMode: boolean
  updateAvatar: (avatar: File) => void
}

export const AvatarEditor = ({ avatar, editMode, updateAvatar }: AvatarEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarImage, setAvatarImage] = useState<string>('')

  useEffect(() => {
    setAvatarImage(avatar)
  }, [avatar])

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className={s.avatarContainer}>
      <div className={s.avatarIconContainer}>
        <img alt={'avatar'} className={s.avatar} src={avatarImage} />
        {!editMode ? (
          <Button className={s.avatarButtonIcon} onClick={handleButtonClick} variant={'icon'}>
            <Edit2Outline height={16} width={16} />
          </Button>
        ) : (
          ''
        )}
      </div>
      <input
        onChange={event => handleFileChange(event, updateAvatar, setAvatarImage)}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type={'file'}
      />
    </div>
  )
}
