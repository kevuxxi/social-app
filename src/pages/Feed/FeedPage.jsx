import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'
import PostList from '../../components/Feed/PostList'
import CreatePostForm from './CreatePostForm'
import Loader from '../../components/ui/Loader'
import ErrorBanner from '../../components/ui/ErrorBanner'
import ScrollToTop from '../../components/ui/ScrollToTop'
import PostCardSkeleton from '../../components/ui/PostCardSkeleton'
import { fetchPosts, setError, setDeleteError } from '../../redux/slices/postsSlice'
import './FeedPage.scss'

const FeedPage = () => {
  const { posts, loading, error, pagination, deleteError } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const postList = Array.isArray(posts) ? posts : posts?.list ?? []
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const sentinelRef = useRef(null)

  useEffect(() => {
    dispatch(setError(null))
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchPosts({ page, limit, mode: page === 1 ? "replace" : "append" }))
  }, [dispatch, page, limit])

  useEffect(() => {
    if (!error) return
    const timeoutId = setTimeout(() => {
      dispatch(setError(null))
    }, 4000)
    return () => clearTimeout(timeoutId)
  }, [dispatch, error])

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth
      if (width < 640) {
        setLimit(6)
      } else if (width < 1024) {
        setLimit(9)
      } else {
        setLimit(12)
      }
    }
    updateLimit()
    window.addEventListener("resize", updateLimit)
    return () => window.removeEventListener("resize", updateLimit)
  }, [])

  useEffect(() => {
    setPage(1)
  }, [limit])

  const hasMore = useMemo(() => {
    if (typeof pagination?.total === "number") return postList.length < pagination.total
    return pagination?.lastCount === limit
  }, [pagination, postList.length, limit])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    if (!hasMore || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPage((prev) => prev + 1)
        }
      },
      { rootMargin: "200px 0px" }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, loading])

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
      </header>

      {error && (
        <ErrorBanner
          title="No se pudieron cargar los posts"
          message={error}
          onDismiss={() => dispatch(setError(null))}
        />
      )}
      {deleteError && (
        <ErrorBanner
          title="No se pudo eliminar el post"
          message={deleteError}
          onDismiss={() => dispatch(setDeleteError(null))}
        />
      )}
      <CreatePostForm />
      {loading && !hasPosts ? (
        <div className="feed-page__skeletons">
          {Array.from({ length: 6 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      ) : hasPosts ? (
        <>
          <PostList posts={postList} />
          <div ref={sentinelRef} />
          {loading && (
            <Loader text="Cargando mas posts..." />
          )}
        </>
      ) : (
        <div className="feed-page__empty">
          <h2>Sin publicaciones a&uacute;n</h2>
          <p>Cuando lleguen las primeras actualizaciones las ver&aacute;s aqu&iacute;.</p>
        </div>
      )}
      <ScrollToTop />
    </Container>
  )
}

export default FeedPage




