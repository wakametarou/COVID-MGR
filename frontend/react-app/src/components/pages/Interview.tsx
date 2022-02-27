import React, { useState, useEffect } from "react"
import { InterviewType, OtherSymptomType } from "types/interview"
import { interviewShow } from "lib/api/auth"
import { useParams } from "react-router-dom"

const Interview: React.FC = () => {
  const [interview, setInterview] = useState<InterviewType>()
  const [otherSymptom, setOtherSymptom] = useState<OtherSymptomType>()
  const query = useParams();

  const getInterview = async (query: any) => {
    try {
      const res = await interviewShow(query.id)
      if (res.data.interview.other) {
        setInterview(res.data.interview)
        console.log("get interview")
      } else {
        setInterview(res.data.interview)
        setOtherSymptom(res.data.otherSymptom)
        console.log("get interview and otherSymptom")
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getInterview(query)
  }, [query])

  return (
    <h1>interview</h1>
  )
}
export default Interview
