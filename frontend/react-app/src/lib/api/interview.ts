import client from "lib/api/client"
import Cookies from "js-cookie"
import {
  InterviewCreateType
} from "types/interview"

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

export const interviewShow = (id: number) => {
  return client.get(`/interviews/show?id=${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!
    }
  })
}

export const interviewNew = () => {
  return client.get("/interviews/new", {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!
    }
  })
}

export const interviewCreate = (params: InterviewCreateType) => {
  return client.post("/interviews/create", params, {
    headers: {
      "access-token": Cookies.get("_access_token")!,
      "client": Cookies.get("_client")!,
      "uid": Cookies.get("_uid")!
    }
  })
}
