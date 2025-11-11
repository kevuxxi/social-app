import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import Register from './pages/Register';
import Login from './pages/Login';
/* import PrivateRoute from './components/PrivateRoute'; */
import Profile from './pages/Profile';

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='app-shell'>
          <main className="app-main">
            <Routes>
              <Route path='/' element={<h1>Home</h1>} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />

              <Route path='/profile' element={
                /*    <PrivateRoute> */
                <Profile />
                /* </PrivateRoute> */} />
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
