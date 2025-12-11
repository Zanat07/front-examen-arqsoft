import { useState, useEffect } from 'react'
import { Subject, GradeCalculation } from '@/types'
import { generateSubjectId } from '@/utils/gradeCalculator'
import { submitSubject, calculateGrades, getSubjects, deleteSubject } from '@/services/api'
import logo from '@/imgs/Escudo_de_la_Universidad_Nacional_de_Colombia_(2016).svg.png'
import SubjectForm from '@/components/SubjectForm'
import SubjectList from '@/components/SubjectList'
import GradeResult from '@/components/GradeResult'
import './GradeCalculator.css'

interface GradeCalculatorProps {
  onLogout: () => void
}

const GradeCalculator = ({ onLogout }: GradeCalculatorProps) => {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [calculation, setCalculation] = useState<GradeCalculation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

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
    
    // Limpiar el cálculo ya que cambió la lista
    setCalculation(null)

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
    setCalculation(null)

    // Intentar eliminar del backend
    try {
      await Promise.all(currentSubjects.map(subject => deleteSubject(subject.id)))
    } catch (error) {
      console.error('Error al limpiar materias del backend:', error)
    }
  }

  const handleCalculateGrades = async () => {
    if (subjects.length === 0) {
      alert('Por favor agrega al menos una materia')
      return
    }

    setIsCalculating(true)
    
    try {
      const payload = {
        subjects: subjects.map(s => ({
          name: s.name,
          grade: s.grade,
          credits: s.credits
        }))
      }

      const result = await calculateGrades(payload)
      setCalculation(result)
    } catch (error) {
      console.error('Error al calcular:', error)
      alert('Error al calcular el promedio. Verifica que el backend esté disponible.')
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <div className="calculator-container">
      <header className="calculator-header">
        <div className="header-content">
          <div className="logo-section">
            <img src={logo} alt="Universidad Nacional de Colombia" className="header-logo" />
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
                  onClick={handleCalculateGrades}
                  className="submit-button"
                  disabled={isLoading || isCalculating}
                >
                  {isCalculating ? 'Calculando...' : 'Calcular Promedio'}
                </button>
                <button 
                  onClick={clearAllSubjects}
                  className="clear-button"
                  disabled={isLoading || isCalculating}
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