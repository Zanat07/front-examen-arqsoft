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

export interface GradeCalculation {
  weightedSum: number
  totalCredits: number
  average: number
}