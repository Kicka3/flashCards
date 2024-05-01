import { ChangeEvent, useEffect, useRef, useState } from 'react'

import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import LogOutOutline from '@/assets/icons/components/LogOutOutline'
import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'

import s from './editProfileWithoutInput.module.scss'

type Props = {
  avatar: string
  email: string
  name: string
}

export const EditProfileWithoutInput = ({ avatar, email, name }: Props) => {
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
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <Card className={s.container}>
      <Typography color={'textSecondary'} variant={'h1'}>
        Personal Info
      </Typography>
      <div className={s.avatarContainer}>
        <img alt={'avatar'} className={s.avatar} src={avatarImage} />
        <Button className={s.avatarButtonIcon} onClick={handleButtonClick} variant={'icon'}>
          <Edit2Outline height={16} width={16} />
        </Button>
        <input
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
      </div>
      <div className={s.nameContainer}>
        <Typography variant={'h2'}>{name}</Typography>
        <Button className={s.nameButtonIcon} variant={'icon'}>
          <Edit2Outline height={16} width={16} />
        </Button>
      </div>
      <Typography className={s.email} variant={'body2'}>
        {email}
      </Typography>
      <Button variant={'secondary'}>
        <div className={s.btnContainer}>
          <LogOutOutline height={16} width={16} />
          Logout
        </div>
      </Button>
    </Card>
  )
}
