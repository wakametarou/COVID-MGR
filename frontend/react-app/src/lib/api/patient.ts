import client from "lib/api/client"
import Cookies from "js-cookie"

import { PatientProfileNewType } from "types/patient"

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

export const patientNew = (params: PatientProfileNewType) => {
  return client.post("/patient_profiles/create", params, {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!
    }
  })
}
