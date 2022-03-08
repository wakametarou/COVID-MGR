export type UsersType = {
  id: number
  image: string
  name: string
  sex: boolean
  roomNumber: number
  status: number
}
export type UserType = {
  id: number
  name: string
  email: string
  sex: boolean
}
export type PatientProfileType = {
  image: string;
  roomNumber: string;
  phoneNumber: string;
  emergencyAddress: string;
  address: string;
  building: string;
}
export type PatientProfileNewType = {
  // image: File | undefined;
  roomNumber: string;
  phoneNumber: string;
  emergencyAddress: string;
  address: string;
  building: string;
}
export type InterviewType = {
  id: number
  temperature: number
  oxygenSaturation: number
  instrumentationTime: Date
  status: number
  other: boolean
  userId: number
}
export type OtherSymptomType = {
  id: number
  painDegree: number
  concrete: string
  interviewId: number
}
export type AnswerType = {
  id: number
  answer: boolean
  interviewId: number
  questionId: number
}
export type QuestionType = {
  id: number
  name: string
  content: string
}
