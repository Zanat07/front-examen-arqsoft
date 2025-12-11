import { Subject } from '@/types'
import './SubjectList.css'

interface SubjectListProps {
  subjects: Subject[]
  onRemoveSubject: (id: string) => void
}

const SubjectList = ({ subjects, onRemoveSubject }: SubjectListProps) => {
  if (subjects.length === 0) {
    return (
      <div className="subject-list-card">
        <h3>Materias Agregadas</h3>
        <div className="empty-state">
          <p>No hay materias agregadas aún</p>
          <p className="empty-subtitle">Agrega tu primera materia usando el formulario de arriba</p>
        </div>
      </div>
    )
  }

  return (
    <div className="subject-list-card">
      <h3>Materias Agregadas ({subjects.length})</h3>
      
      <div className="subject-list">
        {subjects.map((subject) => (
          <div key={subject.id} className="subject-item">
            <div className="subject-info">
              <div className="subject-name">{subject.name}</div>
              <div className="subject-details">
                <span className="grade">Nota: {subject.grade}</span>
                <span className="credits">Créditos: {subject.credits}</span>
                <span className="weighted">
                  Ponderado: {(subject.grade * subject.credits).toFixed(2)}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => onRemoveSubject(subject.id)}
              className="remove-button"
              title="Eliminar materia"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubjectList