// サインアップ
export type SignUpParamsType = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  patientOrDoctor: boolean | undefined
  sex: boolean | undefined
}

// サインイン
export type SignInParamsType = {
  email: string
  password: string
}

// ユーザー cookie
export type UserType = {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  patientOrDoctor: boolean
  sex: boolean
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}
