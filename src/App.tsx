import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import GradeCalculator from './pages/GradeCalculator'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="app">
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/calculator" replace /> : 
            <Login 
              onLogin={() => setIsAuthenticated(true)} 
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
              onRegister={() => {
                setIsAuthenticated(true)
                navigate('/calculator')
              }} 
              onGoToLogin={() => navigate('/login')}
            />
          } 
        />
        <Route 
          path="/calculator" 
          element={
            isAuthenticated ? 
            <GradeCalculator onLogout={() => setIsAuthenticated(false)} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App