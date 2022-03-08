import client from "lib/api/client"
import Cookies from "js-cookie"

import { PatientProfileType, PatientProfileNewType } from "types/patient"

export const patientShow = () => {
  return client.get("/patient_profiles/show", {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!
    }
  })
}

export const patientCreate = (patientProfile: FormData) => {
  return client.post("/patient_profiles/create", patientProfile, {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!,
      "Content-Type": "multipart/form-data"
    }
  },
  )
}

export const patientUpdate = (patientProfile: FormData) => {
  return client.put("/patient_profiles/update", patientProfile, {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!,
      "Content-Type": "multipart/form-data"
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
