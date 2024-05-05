// AvatarEditor.tsx
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import { Button } from '@/common/ui/button'

import s from './avatarEditor.module.scss'

interface AvatarEditorProps {
  avatar: string
  onAvatarChange: (file: File | null) => void
}

export const AvatarEditor = ({ avatar, onAvatarChange }: AvatarEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarImage, setAvatarImage] = useState<string>('')

  useEffect(() => {
    setAvatarImage(avatar)
  }, [avatar])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null

    if (file) {
      const blobUrl = URL.createObjectURL(file)

      setAvatarImage(blobUrl)
      onAvatarChange(file)
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
