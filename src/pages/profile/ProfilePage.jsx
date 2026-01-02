import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './ProfilePage.scss'

const ProfilePage = () => {
    const { id } = useParams();
    return (
        <section className="page profile-detail">
            <header className="profile-detail__header">
                <Link to="/feed" className="profile-detail__back">Volver al feed</Link>
                <h1 className="profile-detail__title">Perfil de usuario</h1>
            </header>
            <main className="profile-detail__content">
                <div className="profile-detail__card">
                    <div className="profile-detail__identity">
                        <div className="profile-detail__avatar" aria-hidden="true">
                            {id?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                            <p className="profile-detail__name">Usuario {id}</p>
                            <p className="profile-detail__meta">Miembro de la comunidad</p>
                        </div>
                    </div>
                </div>
                <section className="profile-detail__posts">
                    <h3 className="profile-detail__posts-title">Posts recientes</h3>
                    <div className="profile-detail__post">
                        <h4 className="profile-detail__post-title">Titulo post</h4>
                        <p className="profile-detail__post-text">Post</p>
                    </div>
                </section>
            </main>
        </section>
    )
}

export default ProfilePage
