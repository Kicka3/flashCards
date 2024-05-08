import { ChangeEvent } from 'react'

export const handleFileChange = async (
  event: ChangeEvent<HTMLInputElement>,
  updateAvatar: (avatarFile: File) => void,
  setAvatarImage: React.Dispatch<React.SetStateAction<string>>
) => {
  const file = event.target.files ? event.target.files[0] : null

  if (file) {
    const validFileTypes = ['image/png', 'image/jpeg', 'image/webp']

    if (!validFileTypes.includes(file.type)) {
      console.error('Invalid file type. Please upload a PNG, JPG or WEBP file.')

      return
    }

    const avatarUrl = URL.createObjectURL(file)

    setAvatarImage(avatarUrl)

    await updateAvatar(file)
  }
}
