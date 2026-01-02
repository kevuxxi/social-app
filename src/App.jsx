import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import Register from './pages/Register';
import Login from './pages/Login';
import ProfilePage from './pages/profile/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/profile/Profile';
import Navbar from './components/Navbar'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { logout } from './redux/slices/authSlice';
import LandingPage from './pages/LandingPage';
import PostDetailPage from './pages/PostDetail/PostDetailPage';
import FeedPage from './pages/Feed/FeedPage';
import MainLayout from './components/Layout/MainLayout';

function App() {
  const dispatch = useDispatch()
  const { token, user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!token) return
    try {
      const decoded = jwtDecode(token)
      const exp = decoded?.exp
      if (typeof exp === 'number' && Date.now() >= exp * 1000) {
        dispatch(logout())
      }
    } catch {
      dispatch(logout())
    }
  }, [token, dispatch])
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          {token && user?.id && <Navbar />}
          <main className="app-main">
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>} />
              <Route path='/profile/:id' element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>} />
              <Route path='/feed' element={
                <PrivateRoute>
                  <FeedPage />
                </PrivateRoute>} />
              <Route path='/post/:id' element={
                <PrivateRoute>
                  <PostDetailPage />
                </PrivateRoute>} />
            </Routes>
          </main>
        </MainLayout>
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
