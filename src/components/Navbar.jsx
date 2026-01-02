import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { FiLogOut, FiUser, FiHome, FiMenu, FiX } from 'react-icons/fi';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Navbar = () => {
    const { currentUser } = useSelector((state) => state.users)
    const authUser = useSelector((state) => state.auth.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const activeUser = currentUser || authUser;
    const displayName = activeUser?.username || activeUser?.email?.split('@')[0] || 'Invitado';
    const displayEmail = activeUser?.email;
    const initials = (displayName?.charAt(0) || '?').toUpperCase();

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Sesion cerrada correctamente')
        navigate('/login');
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="app-navbar" aria-label="Barra de navegacion principal">
            <div className="app-navbar__content">
                <Link to="/feed" className="app-navbar__brand">
                    <span className="app-navbar__brand-pill">social</span>
                    app
                </Link>

                <button
                    className="app-navbar__hamburger"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                <div className={`app-navbar__menu ${isMenuOpen ? 'app-navbar__menu--open' : ''}`}>
                    <div className="app-navbar__nav">
                        <Link to="/feed" className="app-navbar__nav-link" onClick={closeMenu}>
                            <FiHome size={18} />
                            <span>Feed</span>
                        </Link>
                        <Link to={`/profile/${authUser?.id}`} className="app-navbar__nav-link" onClick={closeMenu}>
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
                                <Link to="/profile" onClick={closeMenu}>
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
            </div>
        </nav >
    )
}

export default Navbar
