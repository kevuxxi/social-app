import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { FiTrash2 } from "react-icons/fi"
import { deletePost } from "../../redux/slices/postsSlice"
import {
  getPostId,
  getPostUserId,
  getPostUserName,
  getPostImageUrl,
  getPostDate,
  getPostContent
} from "../../utils/postHelpers"
import { getRelativeTime } from "../../utils/dateHelpers"
import ConfirmModal from "../ui/ConfirmModal"
import "./PostCard.scss"

const PostCard = ({ post }) => {
  if (!post) return null
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);
  const { deletingPostId } = useSelector((state) => state.posts)
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const username = getPostUserName(post)
  const userId = getPostUserId(post)
  const content = getPostContent(post)
  const imageUrl = getPostImageUrl(post)
  const createdAt = getPostDate(post)
  const postId = getPostId(post)
  const author = username || (userId ? `Usuario ${userId}` : "Autor desconocido")
  const avatarLabel = author?.charAt(0)?.toUpperCase() || "U"
  const relativeDate = getRelativeTime(createdAt)

  const isDeletingThis = deletingPostId === postId
  const isOwner = authUser && userId && Number(authUser.id) === Number(userId)

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deletePost({ id: postId }));
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleCardClick = (e) => {
    // No navegar si se hizo clic en un link o botón
    if (e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    navigate(`/post/${postId}`);
  };

  if (!postId) return null

  return (
    <>
      <article className="post-card post-card__link" onClick={handleCardClick}>
        <header className="post-card__header">
          <Link
            to={`/profile/${userId}`}
            className="post-card__avatar-link"
          >
            <div className="post-card__avatar" aria-hidden="true">
              {avatarLabel}
            </div>
          </Link>
          <div className="post-card__meta">
            <Link
              to={`/profile/${userId}`}
              className="post-card__author-link"
            >
              <h3 className="post-card__author">{author}</h3>
            </Link>
            <span className="post-card__date">{relativeDate}</span>
          </div>
          {isOwner ? (
            <span className="post-card__id">
              <button
                type="button"
                className="post-card__delete"
                disabled={isDeletingThis}
                onClick={handleDeleteClick}
                aria-label="Eliminar post"
                title="Eliminar post"
              >
                <FiTrash2 size={16} />
              </button>
            </span>) :
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
      <ConfirmModal
        isOpen={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="¿Eliminar este post?"
        message="Esta acción no se puede deshacer. El post será eliminado permanentemente."
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  )
}

export default PostCard
