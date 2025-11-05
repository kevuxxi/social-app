import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './main.scss'
import "react-toastify/dist/ReactToastify.css";

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

      <ToastContainer
        position="top-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
