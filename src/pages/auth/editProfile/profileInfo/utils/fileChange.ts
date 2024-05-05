import { ChangeEvent } from 'react'

export const handleFileChange = async (
  event: ChangeEvent<HTMLInputElement>,
  updateAvatar: (file: string) => Promise<string>,
  setAvatarImage: (url: string) => void,
  onAvatarChange: (url: null | string) => void
) => {
  const file = event.target.files ? event.target.files[0] : null

  if (file) {
    const validFileTypes = ['image/png', 'image/jpeg', 'image/webp']

    if (!validFileTypes.includes(file.type)) {
      console.error('Invalid file type. Please upload a PNG, JPG or WEBP file.')

      return
    }

    const reader = new FileReader()

    reader.onloadend = async () => {
      const base64String = reader.result as string

      try {
        const uploadedAvatarUrl = await updateAvatar(base64String)

        setAvatarImage(uploadedAvatarUrl)
        onAvatarChange(uploadedAvatarUrl)
      } catch (error) {
        console.error('Error uploading avatar:', error)
        onAvatarChange(null)
      }
    }
    reader.readAsDataURL(file)
  }
}
