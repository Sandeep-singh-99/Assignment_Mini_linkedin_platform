import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import SignUpPage from './pages/SignUpPage'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<SignUpPage />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='*' element={<div>404 Not Found</div>} />
    </Routes>
    </BrowserRouter>
  )
}
