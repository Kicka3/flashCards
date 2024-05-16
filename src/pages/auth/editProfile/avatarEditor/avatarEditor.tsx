import { useEffect, useRef, useState } from 'react'

import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import { FileUploader } from '@/common/hooks/useFileUploader'
import { Button } from '@/common/ui/button'
import { getAvatarUrl } from '@/common/utils/getAvatarUrl'

import s from './avatarEditor.module.scss'

interface AvatarEditorProps {
  avatar: string
  editMode: boolean
  name: string
  updateAvatar: (avatar: File) => void
}

export const AvatarEditor = ({ avatar, editMode, name, updateAvatar }: AvatarEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarImage, setAvatarImage] = useState<string>(getAvatarUrl({ avatar, name }))

  useEffect(() => {
    setAvatarImage(getAvatarUrl({ avatar, name }))
  }, [avatar, name])

  const updateAvatarHandler = async (avatar: File | null) => {
    if (avatar) {
      await updateAvatar(avatar)
    }
  }

  const onClickTrigger = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={s.avatarContainer}>
      <div className={s.avatarWrapper}>
        <img alt={'avatar'} className={s.avatar} src={avatarImage} />
        {!editMode && (
          <FileUploader
            ref={fileInputRef}
            setFile={updateAvatarHandler}
            style={{ display: 'none' }}
            trigger={
              <Button className={s.avatarButtonIcon} onClick={onClickTrigger} variant={'icon'}>
                <Edit2Outline height={16} width={16} />
              </Button>
            }
            type={'file'}
          />
        )}
      </div>
    </div>
  )
}
