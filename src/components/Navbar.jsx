import { motion } from "framer-motion"
import { FiLogOut, FiUser, FiHome } from 'react-icons/fi';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Navbar = () => {
    const { currentUser } = useSelector((state) => state.users)
    const authUser = useSelector((state) => state.auth.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const activeUser = currentUser || authUser;
    const displayName = activeUser?.username || activeUser?.email?.split('@')[0] || 'Invitado';
    const displayEmail = activeUser?.email;
    const initials = (displayName?.charAt(0) || '?').toUpperCase();

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Sesion cerrada correctamente')
        navigate('/login');
    };

    return (
        <nav className="app-navbar" aria-label="Barra de navegacion principal">
            <div className="app-navbar__content">
                <Link to="/feed" className="app-navbar__brand">
                    <span className="app-navbar__brand-pill">social</span>
                    app
                </Link>

                <div className="app-navbar__nav">
                    <Link to="/feed" className="app-navbar__nav-link">
                        <FiHome size={18} />
                        <span>Feed</span>
                    </Link>
                    <Link to={`/profile/${authUser?.id}`} className="app-navbar__nav-link">
                        <FiUser size={18} />
                        <span>Perfil</span>
                    </Link>
                </div>

                <div className="app-navbar__actions">
                    <div className="app-navbar__profile">
                        <div className="app-navbar__avatar" aria-hidden="true">
                            {activeUser ? initials : <FiUser size={18} />}
                        </div>
                        <div className="app-navbar__user">
                            <Link to="/profile">
                                <span className="app-navbar__user-name">{displayName}</span>
                            </Link>
                        </div>
                    </div>

                    {activeUser && <span className="app-navbar__divider" aria-hidden="true" />}

                    {activeUser && (
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={handleLogout}
                            className="app-navbar__logout-btn"
                            aria-label="Cerrar sesion"
                        >
                            <FiLogOut size={18} />
                            <span>Salir</span>
                        </motion.button>
                    )}
                </div>
            </div>
        </nav >
    )
}

export default Navbar
