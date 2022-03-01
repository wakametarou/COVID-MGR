import client from "lib/api/client"
import Cookies from "js-cookie"

import { PatientProfileType } from "types/patient"

export const patientShow = () => {
  return client.get("/patient_profiles/show", {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!
    }
  })
}

export const patientCreate = (params: PatientProfileType) => {
  return client.post("/patient_profiles/create", params, {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!
    }
  })
}

export const patientUpdate = (params: PatientProfileType) => {
  return client.put("/patient_profiles/update", params, {
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
