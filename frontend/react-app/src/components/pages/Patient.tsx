import React, { useContext, useState, useEffect } from "react"
// import { AuthContext } from "App"

import { User, PatientProfile, Interview, Answer, Question } from "interfaces/patient"
import { useParams } from "react-router-dom"

import { userShow } from "lib/api/auth"

const Patient: React.FC = () => {
  // const { currentUser } = useContext(AuthContext)
  const [user, setUser] = useState<User>()
  const [patientProfile, setPatientProfile] = useState<PatientProfile>()
  const [interview, setInterview] = useState<Interview>()
  const [answers, setAnswers] = useState<Answer[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  // console.log(user)
  // console.log(patientProfile)
  // console.log(interview)
  // console.log(answers)
  // console.log(questions)
  const query = useParams();

  const getUser = async (query: any) => {
    try {
      const res = await userShow(query.id)
      if (res.data.user) {
        setUser(res?.data.user)
        setPatientProfile(res?.data.patientProfile)
        setInterview(res?.data.interview)
        setAnswers(res?.data.answers)
        setQuestions(res?.data.questions)
        console.log("get patients")
      } else {
        console.log("Failed to get the patients")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUser(query)
  }, [query])

  return (
    <>
      <h1>test</h1>
    </>
  )
}
export default Patient
