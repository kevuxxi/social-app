import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import "./PostDetailPage.scss"

const PostDetailPage = () => {
    const { id } = useParams();

    return (
        <div className="page post-detail">
            {/*  {createError && <p className="create-post__error">{createError}</p>}
            {createLoading && (
                <div className="feed-page__loader" aria-live="polite">
                    <ClipLoader color="#c7d2fe" size={34} />
                    <p>Creando post...</p>
                </div>
            )} */}
            <header className="post-detail__header">
                <Link to="/feed" className="post-detail__back">Back to feed</Link>
                <div className="post-detail__titles">
                    <h1 className="post-detail__title">Post</h1>
                    <p className="post-detail__meta">Post ID: {id}</p>
                </div>
            </header>
            <main className="post-detail__content">
                <div className="post-detail__card">
                    <p className="post-detail__author">Usuario / fecha</p>
                    <p className="post-detail__text">Texto del post.</p>
                    <div className="post-detail__image post-detail__image--empty">Imagen</div>
                </div>
            </main>
        </div>
    )
}

export default PostDetailPage
