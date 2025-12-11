import { useState } from 'react'
import { Subject } from '@/types'
import { calculateWeightedAverage, generateSubjectId } from '@/utils/gradeCalculator'
import SubjectForm from '@/components/SubjectForm'
import SubjectList from '@/components/SubjectList'
import GradeResult from '@/components/GradeResult'
import './GradeCalculator.css'

interface GradeCalculatorProps {
  onLogout: () => void
}

const GradeCalculator = ({ onLogout }: GradeCalculatorProps) => {
  const [subjects, setSubjects] = useState<Subject[]>([])

  const addSubject = (name: string, grade: number, credits: number) => {
    const newSubject: Subject = {
      id: generateSubjectId(),
      name,
      grade,
      credits
    }
    setSubjects(prev => [...prev, newSubject])
  }

  const removeSubject = (id: string) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id))
  }

  const clearAllSubjects = () => {
    setSubjects([])
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
                  onClick={clearAllSubjects}
                  className="clear-button"
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