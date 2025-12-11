import { useState } from 'react'
import { User } from '@/types'
import './Login.css'

interface LoginProps {
  onLogin: () => void
  onGoToRegister: () => void
}

const Login = ({ onLogin, onGoToRegister }: LoginProps) => {
  const [credentials, setCredentials] = useState<User>({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple validation - in a real app, this would be handled by a backend
    if (credentials.username.trim() && credentials.password.trim()) {
      onLogin()
    } else {
      setError('Por favor, completa todos los campos')
    }
  }

  const handleInputChange = (field: keyof User, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }))
    if (error) setError('')
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-placeholder">
            <div className="logo-icon">📚</div>
          </div>
          <h1>Calculadora de Promedio</h1>
          <p>Inicia sesión para calcular tu promedio académico</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              value={credentials.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Ingresa tu usuario"
              className={error ? 'error' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Ingresa tu contraseña"
              className={error ? 'error' : ''}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>

        <div className="register-link">
          <p>¿No tienes una cuenta?</p>
          <button type="button" onClick={onGoToRegister} className="link-button">
            Registrarse
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login