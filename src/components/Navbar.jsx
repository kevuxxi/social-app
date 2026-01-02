import { motion } from "framer-motion"
import { FiLogOut, FiUser } from 'react-icons/fi';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
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
                <div className="app-navbar__brand">
                    <span className="app-navbar__brand-pill">red</span>
                    social
                </div>

                <div className="app-navbar__actions">
                    <div className="app-navbar__profile">
                        <div className="app-navbar__avatar" aria-hidden="true">
                            {activeUser ? initials : <FiUser size={18} />}
                        </div>
                        <div className="app-navbar__user">
                            <span className="app-navbar__user-label">
                                {activeUser ? 'Sesion activa' : 'Sin sesion'}
                            </span>
                            <span className="app-navbar__user-name">{displayName}</span>
                            {displayEmail && (
                                <span className="app-navbar__user-email">{displayEmail}</span>
                            )}
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
        </nav>
    )
}

export default Navbar
