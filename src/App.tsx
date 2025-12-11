import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import GradeCalculator from './pages/GradeCalculator'
import { isAuthenticated as checkAuth, removeToken } from './services/api'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth())
  const navigate = useNavigate()

  // Check authentication status on mount
  useEffect(() => {
    setIsAuthenticated(checkAuth())
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    navigate('/calculator')
  }

  const handleRegister = () => {
    // After registration, redirect to login
    navigate('/login')
  }

  const handleLogout = () => {
    removeToken()
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <div className="app">
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/calculator" replace /> : 
            <Login 
              onLogin={handleLogin} 
              onGoToRegister={() => navigate('/register')}
            />
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? 
            <Navigate to="/calculator" replace /> : 
            <Register 
              onRegister={handleRegister} 
              onGoToLogin={() => navigate('/login')}
            />
          } 
        />
        <Route 
          path="/calculator" 
          element={
            isAuthenticated ? 
            <GradeCalculator onLogout={handleLogout} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App