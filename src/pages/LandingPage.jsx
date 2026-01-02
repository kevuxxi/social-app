import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiZap } from 'react-icons/fi';

const LandingPage = () => (
  <section className="page landing-page">
    <div className="landing-page__glow" aria-hidden />
    <div className="landing-page__grid">
      <div className="landing-page__hero">
        <p className="landing-page__eyebrow">Red social</p>
        <h1>Construye tu comunidad</h1>
        <p className="landing-page__subtitle">
          Comparte ideas, conecta con personas y mantiene tu feed en movimiento.
        </p>

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
      <div className="landing-page__card">
        <p className="landing-page__card-eyebrow">Comunidad activa</p>
        <div className="landing-page__card-header">
          <FiShield size={22} />
          <h3>Un espacio confiable</h3>
        </div>
        <ul className="landing-page__list">
          <li>
            <strong>Feed claro</strong>
            <span>Publicaciones ordenadas y faciles de seguir.</span>
          </li>
          <li>
            <strong>Perfiles simples</strong>
            <span>Datos clave en un vistazo, sin ruido.</span>
          </li>
          <li>
            <strong>Imagenes optimas</strong>
            <span>Formato consistente para una vista limpia.</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default LandingPage;
