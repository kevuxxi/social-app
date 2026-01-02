import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import PostList from '../../components/Feed/PostList'
import ProfileHeader from './ProfileHeader'
import { useDispatch, useSelector } from 'react-redux'
import { clearProfilePosts, fetchPostsByUser } from '../../redux/slices/postsSlice'
import './ProfilePage.scss'

const ProfilePage = () => {
    const { id: profileUserId } = useParams();
    const dispatch = useDispatch();
    const { list, error, loading } = useSelector((state) => state.posts.profilePosts);
    const page = 1
    const limit = 10
    const hasPosts = Array.isArray(list) && list.length > 0
    const profileUserName = list?.[0]?.user_name ?? list?.[0]?.user?.username ?? null


    useEffect(() => {
        if (!profileUserId) return
        dispatch(clearProfilePosts())
        dispatch(fetchPostsByUser({ userId: profileUserId, page, limit }))
        return () => {
            dispatch(clearProfilePosts())
        }
    }, [dispatch, profileUserId, page, limit])

    const handleRetry = () => {
        dispatch(fetchPostsByUser({ userId: profileUserId, page, limit }))
    }
    return (
        <section className="page profile-detail">
            <header className="profile-detail__header">
                <Link to="/feed" className="profile-detail__back">Volver al feed</Link>
                <h1 className="profile-detail__title">Perfil de usuario</h1>
            </header>
            <main className="profile-detail__content">
                <ProfileHeader
                    profileId={profileUserId}
                    userName={profileUserName}
                    postsCount={list?.length ?? 0}
                    loading={loading}
                    error={error}
                />
                <section className="profile-detail__posts">
                    {loading && !hasPosts ? (
                        <div className="feed-page__loader" aria-live="polite">
                            <ClipLoader color="#c7d2fe" size={34} />
                            <p>Cargando contenido...</p>
                        </div>
                    ) : error ? (
                        <div className="profile-detail__error" role="status">
                            <p>No se pudo cargar los posts.</p>
                            <span>{error}</span>
                            <button type="button" onClick={handleRetry}>Intentar de nuevo</button>
                        </div>
                    ) : hasPosts ? (
                        <>
                            <PostList posts={list} />
                            {loading && (
                                <div className="feed-page__loader" aria-live="polite">
                                    <ClipLoader color="#c7d2fe" size={28} />
                                    <p>Cargando mas posts...</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="feed-page__empty">
                            <h2>Sin publicaciones aun</h2>
                            <p>Cuando lleguen las primeras actualizaciones las veras aqui.</p>
                        </div>
                    )}
                </section>
            </main>
        </section>
    )
}

export default ProfilePage
