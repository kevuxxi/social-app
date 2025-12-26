import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'
import { ClipLoader } from 'react-spinners'
import PostList from '../../components/Feed/PostList'
import CreatePostForm from './CreatePostForm'
import { fetchPosts } from '../../redux/slices/postsSlice'
import './FeedPage.scss'

const FeedPage = () => {
  const { posts, loading, error, pagination } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const postList = Array.isArray(posts) ? posts : posts?.list ?? []

  useEffect(() => {
    dispatch(fetchPosts({ page: pagination.page, limit: pagination.limit }))
  }, [dispatch, pagination.page, pagination.limit])

  const hasPosts = Array.isArray(postList) && postList.length > 0

  return (
    <Container className="page feed-page">
      <header className="feed-page__header">
        <div className="feed-page__eyebrow">Explora</div>
        <div className="feed-page__titles">
          <h1 className="feed-page__title">Tu feed social</h1>
          <p className="feed-page__subtitle">
            Descubre lo que comparte la comunidad y mantente al d&iacute;a con las &uacute;ltimas novedades.
          </p>
        </div>
        <div className="feed-page__meta">
          <span className="feed-page__pill">P&aacute;gina {pagination.page}</span>
          <span className="feed-page__pill">{postList.length} posts</span>
        </div>
      </header>

      {error && (
        <div className="feed-page__alert" role="status">
          {error}
        </div>
      )}
      <CreatePostForm />
      {loading ? (
        <div className="feed-page__loader" aria-live="polite">
          <ClipLoader color="#c7d2fe" size={34} />
          <p>Cargando contenido...</p>
        </div>
      ) : hasPosts ? (
        <PostList posts={postList} />
      ) : (
        <div className="feed-page__empty">
          <h2>Sin publicaciones a&uacute;n</h2>
          <p>Cuando lleguen las primeras actualizaciones las ver&aacute;s aqu&iacute;.</p>
        </div>
      )}
    </Container>
  )
}

export default FeedPage
