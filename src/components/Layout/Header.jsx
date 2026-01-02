import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link to="/feed" className="app-header__logo">
          Social App
        </Link>
      </div>
    </header>
  )
}

export default Header
