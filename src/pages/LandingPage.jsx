import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiZap } from 'react-icons/fi';

const LandingPage = () => (
    <section className="page landing-page">
        <div className="landing-page__glow" aria-hidden />
        <div className="landing-page__grid">
            <div className="landing-page__hero">
                <p className="landing-page__eyebrow">Red social</p>
                <h1>Construí tu comunidad</h1>

                <div className="landing-page__actions">
                    <Link to="/register" className="landing-page__btn landing-page__btn--primary">
                        <FiZap size={18} />
                        Crear cuenta
                    </Link>
                    <Link to="/login" className="landing-page__btn landing-page__btn--ghost">
                        <FiArrowRight size={18} />
                        Ya tengo cuenta
                    </Link>
                </div>
            </div>
        </div>
    </section>
);
export default LandingPage;
