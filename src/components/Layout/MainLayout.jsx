import Header from './Header'

const MainLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <Header />
      {children}
    </div>
  )
}

export default MainLayout
