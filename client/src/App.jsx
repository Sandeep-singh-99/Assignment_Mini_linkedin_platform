import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import SignUpPage from './pages/SignUpPage'
import Profile from './pages/Profile'
import LoginPage from './pages/LoginPage'
import { useDispatch } from 'react-redux'
import { checkAuth } from './redux/slice/authSlice'
import ProfileView from './pages/ProfileView'
import { ToastContainer } from "react-toastify";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    <NavBar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/signup' element={<SignUpPage />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/profile/:id' element={<ProfileView />}/>
      <Route path='*' element={<div>404 Not Found</div>} />
    </Routes>
    </BrowserRouter>
  )
}
