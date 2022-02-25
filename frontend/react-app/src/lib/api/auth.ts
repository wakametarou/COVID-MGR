import client from "lib/api/client"
import Cookies from "js-cookie"

import { SignUpParams, SignInParams, User } from "interfaces/index"

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post("auth", params)
}

// サインイン（ログイン）
export const signIn = (params: SignInParams) => {
  return client.post("auth/sign_in", params)
}

// サインアウト（ログアウト）
export const signOut = () => {
  return client.delete("auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!
    }
  })
}

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
  return client.get("/auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!
    }
  })
}

export const patientShow = () => {
  return client.get("/patient_profiles/show", {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!
    }
  })
}

export const usersIndex = () => {
  return client.get("/users/index", {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!
    }
  })
}

export const userShow = (id: number) => {
  return client.get(`/users/show/?id=${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!
    }
  })
}

export const interviewsIndex = () => {
  return client.get("/interviews/index", {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!
    }
  })
}

export const interviewsIndexUser = (id: number) => {
  return client.get(`/interviews/index?id=${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!
    }
  })
}
