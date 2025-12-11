import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import GradeCalculator from './pages/GradeCalculator'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div className="app">
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/calculator" replace /> : 
            <Login onLogin={() => setIsAuthenticated(true)} />
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