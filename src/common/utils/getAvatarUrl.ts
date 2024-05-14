export const getAvatarUrl = (profile: { avatar: string | undefined; name: string | undefined }) => {
  return (
    profile?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || '')}&background=random`
  )
}
