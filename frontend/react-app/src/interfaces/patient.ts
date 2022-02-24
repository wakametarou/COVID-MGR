export interface UsersIndex {
  id: number
  image: string
  name: string
  sex: boolean
  roomNumber: number
  status: number
}
export interface User {
  id: number,
  name: string,
  email: string,
  sex: boolean,
}
export interface PatientProfile {
  id: number
  image: string,
  roomNumber: number
  phoneNumber: string
  emergencyAddress: string
  address: string
  building: string
  userId: number
}
export interface Interview {
  id: number
  temperature: number
  oxygenSaturation: number
  instrumentationTime: Date
  status: number
  other: boolean
  userId: number
}
export interface Answer {
  id: number
  answer: boolean
  interviewId: number
  questionId: number
}
export interface Question {
  id: number
  name: string
  content: string
}
