import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Profile = () => {
    const navigate = useNavigate();
    const { user, token, loading, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch();


    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Container className="page profile-page">
            <div className="profile-card">
                {/* Header con avatar */}
                <div className="profile-card__header">
                    <div className="profile-card__avatar">
                        <span className="profile-card__avatar-text">
                            {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                        </span>
                    </div>
                    <h1 className="profile-card__title">
                        {user?.username || user?.email?.split('@')[0] || 'Usuario'}
                    </h1>
                    <Badge bg="secondary" className="profile-card__badge">
                        ID: {user?.id || 'N/A'}
                    </Badge>
                </div>

                {/* Información del usuario */}
                <div className="profile-card__info">
                    <div className="profile-card__info-item">
                        <span className="profile-card__info-label">Email</span>
                        <p className="profile-card__info-value">{user?.email || 'No disponible'}</p>
                    </div>

                    {user?.createdAt && (
                        <div className="profile-card__info-item">
                            <span className="profile-card__info-label">Miembro desde</span>
                            <p className="profile-card__info-value">{formatDate(user.createdAt)}</p>
                        </div>
                    )}
                </div>

                {/* Botones de acción */}
                <div className="profile-card__actions">
                    <Button
                        variant="danger"
                        size="lg"
                        className="w-100"
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default Profile;