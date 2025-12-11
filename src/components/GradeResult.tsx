import { GradeCalculation } from '@/types'
import './GradeResult.css'

interface GradeResultProps {
  calculation: GradeCalculation
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

  return (
    <div className="grade-result-card">
      <h2>Resultado del Promedio</h2>
      
      {calculation.totalCredits > 0 ? (
        <div className="result-content">
          <div className={`average-display ${getGradeColor(calculation.average)}`}>
            <div className="average-number">{calculation.average.toFixed(2)}</div>
            <div className="average-label">{getGradeLabel(calculation.average)}</div>
          </div>
          
          <div className="calculation-details">
            <div className="detail-item">
              <span className="detail-label">Suma Ponderada:</span>
              <span className="detail-value">{calculation.weightedSum.toFixed(2)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Total Créditos:</span>
              <span className="detail-value">{calculation.totalCredits}</span>
            </div>
            <div className="detail-item formula">
              <span className="detail-label">Fórmula:</span>
              <span className="detail-value">
                {calculation.weightedSum.toFixed(2)} ÷ {calculation.totalCredits} = {calculation.average.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-data">
          <div className="no-data-icon">📊</div>
          <p>Agrega materias para ver tu promedio</p>
        </div>
      )}
    </div>
  )
}

export default GradeResult