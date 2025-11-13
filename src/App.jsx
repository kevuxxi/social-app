import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import Navbar from './components/Navbar'
import { useSelector } from 'react-redux';
import LandingPage from './pages/LandingPage';
import PostDetailPage from './pages/PostDetail/PostDetailPage';
import FeedPage from './pages/Feed/FeedPage';
import MainLayout from './components/Layout/MainLayout';

function App() {
  const { token } = useSelector((state) => state.auth)
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          {token && <Navbar />}
          <main className="app-main">
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={
                <PrivateRoute>
                  <Profile />
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
