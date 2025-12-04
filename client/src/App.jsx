import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'

import './App.css'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <Router>
      <Routes>

        {/* LOGIN */}
        <Route 
          path="/login" 
          element={
            user ? <Navigate to="/" /> : <Login setUser={setUser} />
          } 
        />

        {/* HOME */}
        <Route 
          path="/" 
          element={
            user ? <Home user={user} setUser={setUser} /> : <Navigate to="/login" />
          } 
        />

        {/* PERFIL */}
        <Route 
          path="/profile/:id" 
          element={
            user ? <Profile user={user} /> : <Navigate to="/login" />
          } 
        />

        {/* EDITAR PERFIL */}
        <Route 
          path="/profile/:id/edit" 
          element={
            user ? <EditProfile user={user} setUser={setUser} /> : <Navigate to="/login" />
          } 
        />

      </Routes>
    </Router>
  )
}

export default App
