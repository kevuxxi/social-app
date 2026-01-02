import { Container, Button, Badge } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FiLogOut } from 'react-icons/fi';
import { fetchUserRequest } from '../../redux/slices/usersSlice';

const Profile = () => {
    const navigate = useNavigate();
    const { currentUser, loading, error } = useSelector((state) => state.users);
    const authUser = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (!authUser?.id) return;

        dispatch(fetchUserRequest(authUser.id));
    }, [authUser?.id, dispatch]);

    if (!authUser?.id) {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Sesion cerrada correctamente');
        navigate('/login');
    };

    return (
        <Container className="page profile-page">
            {loading ? (
                <div className="profile-card">
                    <ClipLoader color="#FFFFFF" size={20} />
                </div>
            ) : (
                <div className="profile-card">
                    <div className="profile-card__header">
                        <div className="profile-card__avatar">
                            <span className="profile-card__avatar-text">
                                {currentUser?.username?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                            </span>
                        </div>
                        <h1 className="profile-card__title">
                            {currentUser?.username || currentUser?.email?.split('@')[0] || 'Usuario'}
                        </h1>
                        <Badge bg="secondary" className="profile-card__badge">
                            ID: {currentUser?.id || 'N/A'}
                        </Badge>
                    </div>

                    <div className="profile-card__info">
                        <div className="profile-card__info-item">
                            <span className="profile-card__info-label">Email</span>
                            <p className="profile-card__info-value">{currentUser?.email || 'No disponible'}</p>
                        </div>

                        {currentUser?.createdAt && (
                            <div className="profile-card__info-item">
                                <span className="profile-card__info-label">Miembro desde</span>
                                <p className="profile-card__info-value">{formatDate(currentUser.createdAt)}</p>
                            </div>
                        )}
                    </div>

                    <div className="profile-card__actions">
                        <Button
                            variant="outline-danger"
                            size="lg"
                            className="w-100 d-flex align-items-center justify-content-center gap-2 profile-card__logout-btn"
                            onClick={handleLogout}
                        >
                            <FiLogOut size={18} />
                            Cerrar sesion
                        </Button>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default Profile;
