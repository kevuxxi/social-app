import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './main.scss'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='app-shell'>
          <main className="app-main">
            <Routes>
              <Route path='/' element={<h1>Home</h1>} />
              <Route path='/login' element={<h1>Login</h1>} />
              <Route path='/register' element={<h1>Register</h1>} />
              <Route path='/profile' element={<h1>profile</h1>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
