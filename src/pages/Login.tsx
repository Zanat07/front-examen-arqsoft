import { useState } from 'react'
import { login, saveToken, LoginRequest } from '@/services/api'
import logo from '@/imgs/Escudo_de_la_Universidad_Nacional_de_Colombia_(2016).svg.png'
import './Login.css'

interface LoginProps {
  onLogin: () => void
  onGoToRegister: () => void
}

const Login = ({ onLogin, onGoToRegister }: LoginProps) => {
  const [credentials, setCredentials] = useState<LoginRequest>({
    correo_institucional: '',
    contrasena: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validation
    if (!credentials.correo_institucional.trim()) {
      setError('Por favor, ingresa tu correo institucional')
      return
    }

    if (!credentials.contrasena.trim()) {
      setError('Por favor, ingresa tu contraseña')
      return
    }

    setIsLoading(true)

    try {
      const response = await login(credentials)
      saveToken(response.access_token)
      onLogin()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof LoginRequest, value: string) => {
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
            <img src={logo} alt="Universidad Nacional de Colombia" className="logo-image" />
          </div>
          <h1>Calculadora de Promedio</h1>
          <p>Inicia sesión para calcular tu promedio académico</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Institucional</label>
            <input
              id="email"
              type="email"
              value={credentials.correo_institucional}
              onChange={(e) => handleInputChange('correo_institucional', e.target.value)}
              placeholder="usuario@unal.edu.co"
              className={error ? 'error' : ''}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={credentials.contrasena}
              onChange={(e) => handleInputChange('contrasena', e.target.value)}
              placeholder="Ingresa tu contraseña"
              className={error ? 'error' : ''}
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="register-link">
          <p>¿No tienes una cuenta?</p>
          <button type="button" onClick={onGoToRegister} className="link-button" disabled={isLoading}>
            Registrarse
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login