import { useState } from 'react'
import { register, RegisterRequest } from '@/services/api'
import './Register.css'

interface RegisterProps {
  onRegister: () => void
  onGoToLogin: () => void
}

const Register = ({ onRegister, onGoToLogin }: RegisterProps) => {
  const [formData, setFormData] = useState<RegisterRequest>({
    nombres: '',
    apellidos: '',
    correo_institucional: '',
    dni: '',
    contrasena: ''
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validations
    if (!formData.nombres.trim()) {
      setError('Por favor, ingresa tus nombres')
      return
    }

    if (!formData.apellidos.trim()) {
      setError('Por favor, ingresa tus apellidos')
      return
    }

    if (!formData.correo_institucional.trim()) {
      setError('Por favor, ingresa tu correo institucional')
      return
    }

    if (!validateEmail(formData.correo_institucional)) {
      setError('Por favor, ingresa un correo electrónico válido')
      return
    }

    if (!formData.dni.trim()) {
      setError('Por favor, ingresa tu número de documento (DNI)')
      return
    }

    if (!/^\d+$/.test(formData.dni)) {
      setError('El DNI debe contener solo números')
      return
    }

    if (!formData.contrasena.trim()) {
      setError('Por favor, ingresa una contraseña')
      return
    }

    if (formData.contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (formData.contrasena !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setIsLoading(true)

    try {
      await register(formData)
      onRegister()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrar'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof RegisterRequest, value: string) => {
    setFormData(prev => ({
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
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombres">Nombres</label>
              <input
                id="nombres"
                type="text"
                value={formData.nombres}
                onChange={(e) => handleInputChange('nombres', e.target.value)}
                placeholder="Ingresa tus nombres"
                className={error ? 'error' : ''}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                id="apellidos"
                type="text"
                value={formData.apellidos}
                onChange={(e) => handleInputChange('apellidos', e.target.value)}
                placeholder="Ingresa tus apellidos"
                className={error ? 'error' : ''}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Institucional</label>
            <input
              id="email"
              type="email"
              value={formData.correo_institucional}
              onChange={(e) => handleInputChange('correo_institucional', e.target.value)}
              placeholder="usuario@unal.edu.co"
              className={error ? 'error' : ''}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dni">Documento de Identidad (DNI)</label>
            <input
              id="dni"
              type="text"
              value={formData.dni}
              onChange={(e) => handleInputChange('dni', e.target.value)}
              placeholder="Ingresa tu número de documento"
              className={error ? 'error' : ''}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={formData.contrasena}
              onChange={(e) => handleInputChange('contrasena', e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className={error ? 'error' : ''}
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="login-link">
          <p>¿Ya tienes una cuenta?</p>
          <button type="button" onClick={onGoToLogin} className="link-button" disabled={isLoading}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
