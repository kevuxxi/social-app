import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PostList from '../../components/Feed/PostList'
import ProfileHeader from './ProfileHeader'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/ui/Loader'
import ErrorBanner from '../../components/ui/ErrorBanner'
import { clearProfilePosts, fetchPostsByUser, setProfileError } from '../../redux/slices/postsSlice'
import { fetchProfileUser, clearProfileUser } from '../../redux/slices/usersSlice'
import { getPostUserName, getPostUserId } from '../../utils/postHelpers'
import './ProfilePage.scss'

const ProfilePage = () => {
    const { id: profileUserId } = useParams();
    const dispatch = useDispatch();
    const { list, error, loading, pagination } = useSelector((state) => state.posts.profilePosts);
    const profileUser = useSelector((state) => state.users?.profileUser);
    const page = 1
    const limit = 10
    const hasPosts = Array.isArray(list) && list.length > 0
    const profileUserData = profileUser?.data
    const isProfileMatch = profileUserData?.id && String(profileUserData.id) === String(profileUserId)
    const firstPostUserId = getPostUserId(list?.[0])
    const isPostUserMatch = firstPostUserId && String(firstPostUserId) === String(profileUserId)
    const profileUserName = isProfileMatch
        ? profileUserData?.username
        : (isPostUserMatch ? getPostUserName(list?.[0]) : null)
    const headerLoading = profileUser?.loading || (!profileUserData && !profileUser?.error)
    const postsCount = pagination?.total ?? 0


    useEffect(() => {
        if (!profileUserId) return
        dispatch(clearProfilePosts())
        dispatch(clearProfileUser())
        dispatch(fetchProfileUser(profileUserId))
        dispatch(fetchPostsByUser({ userId: profileUserId, page, limit }))
        return () => {
            dispatch(clearProfilePosts())
            dispatch(clearProfileUser())
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
                    postsCount={postsCount}
                    loading={headerLoading}
                    error={profileUser?.error}
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
