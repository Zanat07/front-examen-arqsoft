import { useState } from 'react'
import './SubjectForm.css'

interface SubjectFormProps {
  onAddSubject: (name: string, grade: number, credits: number) => void
}

const SubjectForm = ({ onAddSubject }: SubjectFormProps) => {
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('')
  const [credits, setCredits] = useState('')
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!name.trim()) {
      newErrors.name = 'El nombre de la materia es requerido'
    }

    const gradeNum = parseFloat(grade)
    if (!grade || isNaN(gradeNum) || gradeNum < 0 || gradeNum > 5) {
      newErrors.grade = 'La nota debe ser un número entre 0 y 5'
    }

    const creditsNum = parseInt(credits)
    if (!credits || isNaN(creditsNum) || creditsNum <= 0) {
      newErrors.credits = 'Los créditos deben ser un número mayor a 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onAddSubject(name.trim(), parseFloat(grade), parseInt(credits))
      setName('')
      setGrade('')
      setCredits('')
      setErrors({})
    }
  }

  const clearErrors = (field: string) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <div className="subject-form-card">
      <h2>Agregar Materia</h2>
      
      <form onSubmit={handleSubmit} className="subject-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="subject-name">Nombre de la Materia</label>
            <input
              id="subject-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                clearErrors('name')
              }}
              placeholder="Ej: Matemáticas"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="subject-grade">Nota (0-5)</label>
            <input
              id="subject-grade"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={grade}
              onChange={(e) => {
                setGrade(e.target.value)
                clearErrors('grade')
              }}
              placeholder="4.5"
              className={errors.grade ? 'error' : ''}
            />
            {errors.grade && <span className="error-text">{errors.grade}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="subject-credits">Créditos</label>
            <input
              id="subject-credits"
              type="number"
              min="1"
              value={credits}
              onChange={(e) => {
                setCredits(e.target.value)
                clearErrors('credits')
              }}
              placeholder="3"
              className={errors.credits ? 'error' : ''}
            />
            {errors.credits && <span className="error-text">{errors.credits}</span>}
          </div>
        </div>

        <button type="submit" className="add-button">
          Agregar Materia
        </button>
      </form>
    </div>
  )
}

export default SubjectForm