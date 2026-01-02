const ProfileHeader = ({ profileId, userName, postsCount, loading, error }) => {
  if (loading) {
    return (
      <div className="profile-header profile-header--skeleton" aria-hidden="true">
        <div className="profile-header__avatar-skeleton" />
        <div className="profile-header__lines">
          <div className="profile-header__line profile-header__line--title" />
          <div className="profile-header__line" />
        </div>
      </div>
    )
  }

  const initial = userName ? userName.charAt(0).toUpperCase() : "U"
  const displayName = userName || (profileId ? `Usuario ${profileId}` : "Usuario")

  return (
    <div className="profile-header">
      <div className="profile-header__avatar" aria-hidden="true">
        {initial}
      </div>
      <div className="profile-header__info">
        <p className="profile-header__name">{displayName}</p>
        <p className="profile-header__meta">{postsCount} posts</p>
        {error && <p className="profile-header__error">No se pudo cargar el perfil.</p>}
      </div>
    </div>
  )
}

export default ProfileHeader
