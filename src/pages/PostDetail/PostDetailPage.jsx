import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./PostDetailPage.scss"
import { useDispatch, useSelector } from "react-redux"
import { FiTrash2 } from "react-icons/fi"
import Loader from "../../components/ui/Loader"
import ErrorBanner from "../../components/ui/ErrorBanner"
import ConfirmModal from "../../components/ui/ConfirmModal"
import { fetchPostById, clearPostDetail, deletePost, setDetailError, setDeleteError } from "../../redux/slices/postsSlice"
import { getPostId, getPostUserId, getPostUserName, getPostImageUrl, getPostDate, getPostContent } from "../../utils/postHelpers"
import { getRelativeTime } from "../../utils/dateHelpers"

const PostDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postDetail, detailLoading, detailError, deleteLoading, deleteError, deletingPostId } = useSelector((state) => (state.posts))
    const authUser = useSelector((state) => state.auth.user)
    const [didRequestDelete, setDidRequestDelete] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const imageUrl = getPostImageUrl(postDetail)
    const postOwnerId = getPostUserId(postDetail)
    const postUserName = getPostUserName(postDetail)
    const content = getPostContent(postDetail)

    const createdAt = getPostDate(postDetail)
    const relativeDate = getRelativeTime(createdAt)

    useEffect(() => {
        if (!id) return
        dispatch(fetchPostById({ id }))
        return () => {
            return dispatch(clearPostDetail())
        }

    }, [id, dispatch])

    useEffect(() => {
        if (!didRequestDelete) return
        if (deleteLoading) return
        if (deleteError) {
            setDidRequestDelete(false)
            return
        }
        if (!deletingPostId) {
            setDidRequestDelete(false)
            navigate("/feed")
        }
    }, [didRequestDelete, deleteLoading, deleteError, deletingPostId, navigate])

    const postId = getPostId(postDetail)
    const isOwner = authUser && postOwnerId && Number(authUser.id) === Number(postOwnerId)
    const isDeletingThis = deletingPostId === postId

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    }

    const handleConfirmDelete = () => {
        setDidRequestDelete(true)
        dispatch(deletePost({ id: postId }))
        setShowDeleteModal(false);
    }

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    }

    if (!postDetail && !detailLoading) {
        return (
            <div>
                <header className="post-detail__header">
                    <Link to="/feed" className="post-detail__back">Volver al feed</Link>
                    <div className="post-detail__titles">
                    </div>
                </header>
                <p>Post no encontrado</p>
            </div>
        )
    }

    return (
        <div className="page post-detail">

            {detailLoading && (
                <Loader text="Cargando..." />
            )}
            {detailError && (
                <ErrorBanner
                    title="No se pudo cargar el post"
                    message={detailError}
                    onDismiss={() => dispatch(setDetailError(null))}
                />
            )}
            <header className="post-detail__header">
                <Link to="/feed" className="post-detail__back">Volver al feed</Link>
                <div className="post-detail__titles">
                </div>
            </header>
            <main className="post-detail__content">
                <div className="post-detail__card">
                    {isOwner && (
                        <div className="post-detail__actions">
                            <button
                                type="button"
                                className="post-detail__delete"
                                onClick={handleDeleteClick}
                                disabled={isDeletingThis}
                                aria-label="Eliminar post"
                                title="Eliminar post"
                            >
                                <FiTrash2 size={16} />
                            </button>
                        </div>
                    )}
                    {deleteError && (
                        <ErrorBanner
                            title="No se pudo eliminar el post"
                            message={deleteError}
                            onDismiss={() => dispatch(setDeleteError(null))}
                        />
                    )}
                    {postUserName ? (
                        <div className="post-detail__author">Usuario: {postUserName}</div>)
                        : (<p className="post-detail__author">Usuario: anonimo</p>)}
                    <p className="post-detail__meta">Fecha de publicacion: {relativeDate}</p>
                    {content && <p className="post-detail__text">{content}</p>}
                    {imageUrl && (
                        <div className="post-detail__image">
                            <img src={imageUrl} alt={`Imagen del post ${postId ?? ""}`} loading="lazy" />
                        </div>
                    )}
                </div>
            </main>
            <ConfirmModal
                isOpen={showDeleteModal}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                title="¿Eliminar este post?"
                message="Esta acción no se puede deshacer. El post será eliminado permanentemente."
                confirmText="Eliminar"
                cancelText="Cancelar"
            />
        </div>
    )
}

export default PostDetailPage
