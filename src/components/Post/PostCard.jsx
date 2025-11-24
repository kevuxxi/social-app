import "./PostCard.scss"

const PostCard = ({ post }) => {
  if (!post) return null

  const {
    username,
    user_id: userId,
    content,
    image_url: imageUrl,
    created_at: createdAt,
    post_id: postId,
  } = post

  const author = username || (userId ? `Usuario ${userId}` : "Autor desconocido")
  const avatarLabel = author?.charAt(0)?.toUpperCase() || "U"
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Fecha no disponible"

  return (
    <article className="post-card">
      <header className="post-card__header">
        <div className="post-card__avatar" aria-hidden="true">
          {avatarLabel}
        </div>
        <div className="post-card__meta">
          <h3 className="post-card__author">{author}</h3>
          <span className="post-card__date">{formattedDate}</span>
        </div>
        {postId && <span className="post-card__id">#{postId}</span>}
      </header>

      {imageUrl && (
        <div className="post-card__image">
          <img src={imageUrl} alt={`Imagen del post ${postId ?? ""}`} loading="lazy" />
        </div>
      )}

      {content && <p className="post-card__content">{content}</p>}

      <footer className="post-card__footer">
        <div className="post-card__tag">Comunidad</div>
        <div className="post-card__status">Activo</div>
      </footer>
    </article>
  )
}

export default PostCard
