import { Subject } from '@/types'

// Backend URLs - Direct connections to backend services
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || 'http://localhost:8001'
const CALCULATOR_API_URL = import.meta.env.VITE_CALCULATOR_API_URL || 'http://localhost:8002'

// ==================== AUTH API TYPES ====================

export interface LoginRequest {
  correo_institucional: string
  contrasena: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

export interface RegisterRequest {
  nombres: string
  apellidos: string
  correo_institucional: string
  dni: string
  contrasena: string
}

export interface RegisterResponse {
  id: number
  nombres: string
  apellidos: string
  correo_institucional: string
  dni: string
  created_at: string
}

// ==================== CALCULATOR API TYPES ====================

export interface SubjectPayload {
  name: string
  grade: number
  credits: number
}

export interface CalculationPayload {
  subjects: SubjectPayload[]
}

export interface SubjectResult {
  name: string
  grade: number
  credits: number
  weighted_grade: number
}

export interface CalculationResponse {
  subjects: SubjectResult[]
  total_credits: number
  semester_gpa: number
  message: string
}

// ==================== AUTH API FUNCTIONS ====================

// Login - Authenticate user
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `Error de autenticación: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en login:', error)
    throw error
  }
}

// Register - Create new student account
export const register = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${AUTH_API_URL}/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `Error al registrar: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en register:', error)
    throw error
  }
}

// Health check for auth service
export const checkAuthHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${AUTH_API_URL}/health`)
    return response.ok
  } catch {
    return false
  }
}

// ==================== CALCULATOR API FUNCTIONS ====================

// Calculate GPA - Send subjects and get semester GPA
export const calculateGrades = async (payload: CalculationPayload): Promise<CalculationResponse> => {
  try {
    const response = await fetch(`${CALCULATOR_API_URL}/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `Error al calcular el promedio: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en calculateGrades:', error)
    throw error
  }
}

// Health check for calculator service
export const checkCalculatorHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${CALCULATOR_API_URL}/health`)
    return response.ok
  } catch {
    return false
  }
}

// ==================== LEGACY FUNCTIONS (for compatibility) ====================

// These functions are kept for backward compatibility but may not have backend support

export const submitSubject = async (subject: SubjectPayload): Promise<any> => {
  console.warn('submitSubject: This endpoint may not be implemented in the backend')
  // For now, just return the subject as-is since backend doesn't have this endpoint
  return subject
}

export const getSubjects = async (): Promise<Subject[]> => {
  console.warn('getSubjects: This endpoint is not implemented in the backend')
  // Return empty array since backend doesn't have this endpoint
  return []
}

export const updateSubject = async (id: string, subject: SubjectPayload): Promise<any> => {
  console.warn('updateSubject: This endpoint is not implemented in the backend')
  return { id, ...subject }
}

export const deleteSubject = async (id: string): Promise<any> => {
  console.warn('deleteSubject: This endpoint is not implemented in the backend')
  return { id, deleted: true }
}

// ==================== TOKEN MANAGEMENT ====================

const TOKEN_KEY = 'pappi_auth_token'

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

export const isAuthenticated = (): boolean => {
  return !!getToken()
}
