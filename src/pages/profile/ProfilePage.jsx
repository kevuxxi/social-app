import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PostList from '../../components/Feed/PostList'
import ProfileHeader from './ProfileHeader'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/ui/Loader'
import ErrorBanner from '../../components/ui/ErrorBanner'
import { clearProfilePosts, fetchPostsByUser, setProfileError } from '../../redux/slices/postsSlice'
import { getPostUserName } from '../../utils/postHelpers'
import './ProfilePage.scss'

const ProfilePage = () => {
    const { id: profileUserId } = useParams();
    const dispatch = useDispatch();
    const { list, error, loading } = useSelector((state) => state.posts.profilePosts);
    const page = 1
    const limit = 10
    const hasPosts = Array.isArray(list) && list.length > 0
    const profileUserName = getPostUserName(list?.[0])


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
                <div className="profile-detail__header-top">
                    <Link to="/feed" className="profile-detail__back">Volver al feed</Link>
                    <h1 className="profile-detail__title">Perfil de usuario</h1>
                </div>
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
                        <div className="profile-detail__state">
                            <Loader text="Cargando contenido..." />
                        </div>
                    ) : error ? (
                        <ErrorBanner
                            title="No se pudo cargar los posts"
                            message={error}
                            onRetry={handleRetry}
                            onDismiss={() => dispatch(setProfileError(null))}
                        />
                    ) : hasPosts ? (
                        <>
                            <PostList posts={list} />
                            {loading && (
                                <div className="profile-detail__state">
                                    <Loader text="Cargando mas posts..." />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="feed-page__empty profile-detail__state">
                            <h2>Sin publicaciones aun</h2>
                            <p>Cuando lleguen las primeras actualizaciones las veras aqui.</p>
                            <Link to="/feed" className="profile-detail__empty-link">Volver al feed</Link>
                        </div>
                    )}
                </section>
            </main>
        </section>
    )
}

export default ProfilePage
