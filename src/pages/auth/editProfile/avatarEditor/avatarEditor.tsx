import { ChangeEvent, useEffect, useRef, useState } from 'react'

import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import { Button } from '@/common/ui/button'

import s from './avatarEditor.module.scss'

type Props = {
  avatar: string
  onAvatarChange: (url: null | string) => void
  updateAvatar: (file: File) => Promise<string>
}

export const AvatarEditor = ({ avatar, onAvatarChange, updateAvatar }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarImage, setAvatarImage] = useState<string>('')

  useEffect(() => {
    setAvatarImage(avatar)
  }, [avatar])

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null

    if (file) {
      const blobUrl = URL.createObjectURL(file)

      setAvatarImage(blobUrl)

      try {
        const uploadedAvatarUrl = await updateAvatar(file)

        setAvatarImage(uploadedAvatarUrl)
        onAvatarChange(uploadedAvatarUrl)
      } catch (error) {
        console.error('Error uploading avatar:', error)
        onAvatarChange(null)
      }
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className={s.avatarContainer}>
      <div className={s.avatarIconContainer}>
        <img alt={'avatar'} className={s.avatar} src={avatarImage} />
        <Button className={s.avatarButtonIcon} onClick={handleButtonClick} variant={'icon'}>
          <Edit2Outline height={16} width={16} />
        </Button>
      </div>
      <input
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type={'file'}
      />
    </div>
  )
}
