export interface Subject {
  id: string
  name: string
  grade: number
  credits: number
}

export interface User {
  username: string
  password: string
}

// Backend response types
export interface SubjectResult {
  name: string
  grade: number
  credits: number
  weighted_grade: number
}

export interface GradeCalculation {
  subjects: SubjectResult[]
  total_credits: number
  semester_gpa: number
  message: string
}