import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import "./PostDetailPage.scss"
import { useDispatch, useSelector } from "react-redux"
import { FiTrash2 } from "react-icons/fi"
import { fetchPostById, clearPostDetail, deletePost } from "../../redux/slices/postsSlice"

const PostDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postDetail, detailLoading, detailError, deleteLoading, deleteError, deletingPostId } = useSelector((state) => (state.posts))
    const authUser = useSelector((state) => state.auth.user)
    const [didRequestDelete, setDidRequestDelete] = useState(false)

    const imageUrl = postDetail?.image_url
    const postOwnerId = postDetail?.user?.id ?? postDetail?.user_id

    const formattedDate = postDetail?.created_at
        ? new Date(postDetail.created_at).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        : "Fecha no disponible"

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

    const postId = postDetail?.post_id ?? postDetail?.id
    const isOwner = authUser && postOwnerId && Number(authUser.id) === Number(postOwnerId)
    const isDeletingThis = deletingPostId === postId

    const handleDeleteClick = () => {
        const confirmed = window.confirm("Eliminar este post?");
        if (!confirmed) return;
        setDidRequestDelete(true)
        dispatch(deletePost({ id: postId }))
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
                <div className="feed-page__loader" aria-live="polite">
                    <ClipLoader color="#c7d2fe" size={34} />
                    <p>Cargando...</p>
                </div>
            )}
            {detailError && <p className="create-post__error">{detailError}</p>}
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
                    {postDetail?.user_name ? (
                        <div className="post-detail__author">Usuario: {postDetail?.user_name}</div>)
                        : (<p className="post-detail__author">Usuario: anonimo</p>)}
                    <p className="post-detail__meta">Fecha de publicacion: {formattedDate}</p>
                    <p className="post-detail__text">{postDetail?.content}</p>
                    {postDetail?.image_url && (
                        <div className="post-detail__image">
                            <img src={imageUrl} alt={`Imagen del post ${postDetail?.id ?? ""}`} loading="lazy" />
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default PostDetailPage
