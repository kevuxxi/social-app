import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import "./PostDetailPage.scss"
import { useDispatch, useSelector } from "react-redux"
import { fetchPostById, clearPostDetail } from "../../redux/slices/postsSlice"

const PostDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { postDetail, detailLoading, detailError } = useSelector((state) => (state.posts))

    const imageUrl = postDetail?.image_url

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

    if (!postDetail && !detailLoading) {
        return (
            <div>
                <p>Post not found</p>
            </div>
        )
    }

    return (
        <div className="page post-detail">
            {!postDetail && (
                <div >
                    <p>Post not found</p>
                </div>
            )}
            {detailLoading && (
                <div className="feed-page__loader" aria-live="polite">
                    <ClipLoader color="#c7d2fe" size={34} />
                    <p>Cargando...</p>
                </div>
            )}
            {detailError && <p className="create-post__error">{createError}</p>}
            <header className="post-detail__header">
                <Link to="/feed" className="post-detail__back">Back to feed</Link>
                <div className="post-detail__titles">
                </div>
            </header>
            <main className="post-detail__content">
                <div className="post-detail__card">
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
