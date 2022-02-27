export interface Interview {
  id: number
  temperature: number
  oxygenSaturation: number
  instrumentationTime: Date
  status: number
  other: boolean
  userId: number
  createdAt: Date
}

export interface OtherSymptom {
  id: number
  painDegree: number
  concrete: string
  interviewId: number
}
