// サインアップ
export interface SignUpParams {

  name: string
  email: string
  password: string
  passwordConfirmation: string
  patientOrDoctor: boolean
  sex: boolean
  // patient
  patientProfile: PatientParams

}

export interface PatientParams {
  // patient
  roomNumber: number
  phoneNumber: string
  emergencyAddress: string
  address: string
  bilding: string
}

// サインイン
export interface SignInParams {
  email: string
  password: string
}

// ユーザー
export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}
