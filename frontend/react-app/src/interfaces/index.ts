// サインアップ
export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  patientOrDoctor: boolean | undefined
  sex: boolean | undefined
}

// サインイン
export interface SignInParams {
  email: string
  password: string
}

// 患者様情報
export interface PatientParams {
  image: string
  roomNumber: number
  phoneNumber: string
  emergencyAddress: string
  address: string
  building: string
}

// ユーザー cookie
export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}
