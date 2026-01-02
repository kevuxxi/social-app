import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import "./PostCard.scss"


const PostCard = ({ post }) => {
  if (!post) return null
  const authUser = useSelector((state) => state.auth.user);


  const username = post.user?.username ?? post.username ?? post.user_name
  const userId = post.user?.id ?? post.user_id
  const content = post.content
  const imageUrl = post.image_url
  const createdAt = post.created_at
  const postId = post.post_id ?? post.id

  const author = username || (userId ? `Usuario ${userId}` : "Autor desconocido")
  const avatarLabel = author?.charAt(0)?.toUpperCase() || "U"
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    : "Fecha no disponible"

  const isOwner = authUser && userId && Number(authUser.id) === Number(userId)

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // dispatch delete...
  };


  if (!postId) return null

  return (
    <Link to={`/post/${postId}`} className="post-card__link">
      <article className="post-card">
        <header className="post-card__header">
          <div className="post-card__avatar" aria-hidden="true">
            {avatarLabel}
          </div>
          <div className="post-card__meta">
            <h3 className="post-card__author">{author}</h3>
            <span className="post-card__date">{formattedDate}</span>
          </div>
          {isOwner ? (
            <span className="post-card__id"><button onClick={handleDeleteClick}>Delete</button></span>) :
            (<span className="post-card__id">#{postId}</span>)}
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
    </Link>
  )
}

export default PostCard
