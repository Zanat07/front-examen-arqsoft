import { useState } from 'react'
import { User } from '@/types'
import './Register.css'

interface RegisterProps {
  onRegister: () => void
  onGoToLogin: () => void
}

const Register = ({ onRegister, onGoToLogin }: RegisterProps) => {
  const [credentials, setCredentials] = useState<User>({
    username: '',
    password: ''
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!credentials.username.trim()) {
      setError('Por favor, ingresa tu correo electrónico')
      return
    }

    if (!validateEmail(credentials.username)) {
      setError('Por favor, ingresa un correo electrónico válido')
      return
    }

    if (!credentials.password.trim()) {
      setError('Por favor, ingresa una contraseña')
      return
    }

    if (credentials.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (credentials.password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    // Registro exitoso
    onRegister()
  }

  const handleInputChange = (field: keyof User, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }))
    if (error) setError('')
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <div className="logo-placeholder">
            <div className="logo-icon">📚</div>
          </div>
          <h1>Crear Cuenta</h1>
          <p>Regístrate para calcular tu promedio académico</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={credentials.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="ejemplo@correo.com"
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
              placeholder="Mínimo 6 caracteres"
              className={error ? 'error' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (error) setError('')
              }}
              placeholder="Repite tu contraseña"
              className={error ? 'error' : ''}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="register-button">
            Registrarse
          </button>
        </form>

        <div className="login-link">
          <p>¿Ya tienes una cuenta?</p>
          <button type="button" onClick={onGoToLogin} className="link-button">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
