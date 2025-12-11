import { Subject, GradeCalculation } from '@/types'

export const calculateWeightedAverage = (subjects: Subject[]): GradeCalculation => {
  if (subjects.length === 0) {
    return { weightedSum: 0, totalCredits: 0, average: 0 }
  }

  const weightedSum = subjects.reduce((sum, subject) => {
    return sum + (subject.grade * subject.credits)
  }, 0)

  const totalCredits = subjects.reduce((sum, subject) => {
    return sum + subject.credits
  }, 0)

  const average = totalCredits > 0 ? weightedSum / totalCredits : 0

  return {
    weightedSum,
    totalCredits,
    average: Math.round(average * 100) / 100 // Round to 2 decimal places
  }
}

export const generateSubjectId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}