import { useState, useEffect } from 'react'
import { Subject } from '@/types'
import { calculateWeightedAverage, generateSubjectId } from '@/utils/gradeCalculator'
import { submitSubject, submitCalculation, getSubjects, deleteSubject } from '@/services/api'
import SubjectForm from '@/components/SubjectForm'
import SubjectList from '@/components/SubjectList'
import GradeResult from '@/components/GradeResult'
import './GradeCalculator.css'

interface GradeCalculatorProps {
  onLogout: () => void
}

const GradeCalculator = ({ onLogout }: GradeCalculatorProps) => {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Cargar materias al montar el componente
  useEffect(() => {
    loadSubjects()
  }, [])

  const loadSubjects = async () => {
    try {
      setIsLoading(true)
      const data = await getSubjects()
      setSubjects(data)
    } catch (error) {
      console.error('Error al cargar materias:', error)
      // Continuar con arreglo vacío si hay error
    } finally {
      setIsLoading(false)
    }
  }

  const addSubject = async (name: string, grade: number, credits: number) => {
    const newSubject: Subject = {
      id: generateSubjectId(),
      name,
      grade,
      credits
    }
    
    // Actualizar UI inmediatamente
    setSubjects(prev => [...prev, newSubject])

    // Enviar al backend
    try {
      await submitSubject({ name, grade, credits })
    } catch (error) {
      console.error('Error al enviar materia al backend:', error)
      // Podríamos revertir el cambio si falla
    }
  }

  const removeSubject = async (id: string) => {
    // Actualizar UI inmediatamente
    setSubjects(prev => prev.filter(subject => subject.id !== id))

    // Eliminar del backend
    try {
      await deleteSubject(id)
    } catch (error) {
      console.error('Error al eliminar materia del backend:', error)
    }
  }

  const clearAllSubjects = async () => {
    const currentSubjects = [...subjects]
    
    // Limpiar UI inmediatamente
    setSubjects([])

    // Intentar eliminar del backend
    try {
      await Promise.all(currentSubjects.map(subject => deleteSubject(subject.id)))
    } catch (error) {
      console.error('Error al limpiar materias del backend:', error)
    }
  }

  const handleSubmitCalculation = async () => {
    try {
      const calculation = calculateWeightedAverage(subjects)
      const payload = {
        subjects: subjects.map(s => ({
          name: s.name,
          grade: s.grade,
          credits: s.credits
        })),
        totalAverage: calculation.average,
        totalCredits: calculation.totalCredits
      }

      await submitCalculation(payload)
      alert('Cálculo enviado exitosamente al backend')
    } catch (error) {
      console.error('Error al enviar cálculo:', error)
      alert('Error al enviar el cálculo')
    }
  }

  const calculation = calculateWeightedAverage(subjects)

  return (
    <div className="calculator-container">
      <header className="calculator-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">📚</div>
            <h1>Calculadora de Promedio Académico</h1>
          </div>
          <button onClick={onLogout} className="logout-button">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="calculator-main">
        <div className="calculator-grid">
          <div className="form-section">
            <SubjectForm onAddSubject={addSubject} />
          </div>

          <div className="results-section">
            <GradeResult calculation={calculation} />
            
            {subjects.length > 0 && (
              <div className="actions-section">
                <button 
                  onClick={handleSubmitCalculation}
                  className="submit-button"
                  disabled={isLoading}
                >
                  Enviar Cálculo
                </button>
                <button 
                  onClick={clearAllSubjects}
                  className="clear-button"
                  disabled={isLoading}
                >
                  Limpiar Todo
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="subjects-section">
          <SubjectList 
            subjects={subjects} 
            onRemoveSubject={removeSubject}
          />
        </div>
      </main>
    </div>
  )
}

export default GradeCalculator