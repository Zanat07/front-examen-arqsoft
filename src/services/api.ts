import { Subject } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export interface SubjectPayload {
  name: string
  grade: number
  credits: number
}

export interface CalculationPayload {
  subjects: SubjectPayload[]
}

export interface CalculationResponse {
  weightedSum: number
  totalCredits: number
  average: number
}

// Enviar una materia individual al backend
export const submitSubject = async (subject: SubjectPayload): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/subjects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: subject.name,
        grade: subject.grade,
        credits: subject.credits
      })
    })

    if (!response.ok) {
      throw new Error(`Error al enviar la materia: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en submitSubject:', error)
    throw error
  }
}

// Enviar todas las materias para cálculo en el backend
export const calculateGrades = async (payload: CalculationPayload): Promise<CalculationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`Error al calcular el promedio: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en calculateGrades:', error)
    throw error
  }
}

// Obtener histórico de materias
export const getSubjects = async (): Promise<Subject[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/subjects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`Error al obtener las materias: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en getSubjects:', error)
    throw error
  }
}

// Actualizar una materia
export const updateSubject = async (id: string, subject: SubjectPayload): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/subjects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: subject.name,
        grade: subject.grade,
        credits: subject.credits
      })
    })

    if (!response.ok) {
      throw new Error(`Error al actualizar la materia: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en updateSubject:', error)
    throw error
  }
}

// Eliminar una materia
export const deleteSubject = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/subjects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`Error al eliminar la materia: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en deleteSubject:', error)
    throw error
  }
}
