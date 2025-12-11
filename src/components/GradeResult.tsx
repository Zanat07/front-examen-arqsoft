import { GradeCalculation } from '@/types'
import './GradeResult.css'

interface GradeResultProps {
  calculation: GradeCalculation | null
}

const GradeResult = ({ calculation }: GradeResultProps) => {
  const getGradeColor = (average: number) => {
    if (average >= 4.5) return 'excellent'
    if (average >= 4.0) return 'good'
    if (average >= 3.5) return 'average'
    if (average >= 3.0) return 'low'
    return 'failing'
  }

  const getGradeLabel = (average: number) => {
    if (average >= 4.5) return 'Excelente'
    if (average >= 4.0) return 'Bueno'
    if (average >= 3.5) return 'Regular'
    if (average >= 3.0) return 'Bajo'
    return 'Insuficiente'
  }

  // Calculate weighted sum from subjects
  const getWeightedSum = (calculation: GradeCalculation) => {
    return calculation.subjects.reduce((sum, subject) => sum + subject.weighted_grade, 0)
  }

  return (
    <div className="grade-result-card">
      <h2>Resultado del Promedio</h2>
      
      {calculation && calculation.total_credits > 0 ? (
        <div className="result-content">
          <div className={`average-display ${getGradeColor(calculation.semester_gpa)}`}>
            <div className="average-number">{calculation.semester_gpa.toFixed(2)}</div>
            <div className="average-label">{getGradeLabel(calculation.semester_gpa)}</div>
          </div>
          
          <div className="message-section">
            <p className="result-message">{calculation.message}</p>
          </div>
          
          <div className="calculation-details">
            <div className="detail-item">
              <span className="detail-label">Suma Ponderada:</span>
              <span className="detail-value">{getWeightedSum(calculation).toFixed(2)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Total Créditos:</span>
              <span className="detail-value">{calculation.total_credits}</span>
            </div>
            <div className="detail-item formula">
              <span className="detail-label">Fórmula:</span>
              <span className="detail-value">
                {getWeightedSum(calculation).toFixed(2)} ÷ {calculation.total_credits} = {calculation.semester_gpa.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-data">
          <div className="no-data-icon">📊</div>
          <p>Agrega materias y haz clic en "Calcular Promedio"</p>
        </div>
      )}
    </div>
  )
}

export default GradeResult