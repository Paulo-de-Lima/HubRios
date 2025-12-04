import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
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
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} 
        />
        <Route 
          path="/" 
          element={user ? <Home user={user} setUser={setUser} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile/:id" 
          element={user ? <Profile user={user} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  )
}

export default App


