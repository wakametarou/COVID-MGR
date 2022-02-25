import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "App"
import { useNavigate, useParams } from "react-router-dom"

import { Interview } from "interfaces/interview"
import { interviewsIndex, interviewsIndexUser } from "lib/api/auth"

const Interviews: React.FC = () => {
  const { currentUser } = useContext(AuthContext)
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [page, setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>()
  const [displayedUsers, setDisplayedUsers] = useState<Interview[]>([])
  const displayNum = 5;
  const navigate = useNavigate()
  const query = useParams();
  console.log(interviews)

  const saveInterviews = (res: Interview[]) => {
    if (res) {
      setInterviews(res)
      console.log("get interviews")
    } else {
      console.log("Failed to get the interviews")
    }
  }
  const getInterviews = async (query: any) => {
    try {
      if (currentUser?.patientOrDoctor) {
        const res = await interviewsIndex()
        saveInterviews(res.data)
      } else {
        const res = await interviewsIndexUser(query.id)
        saveInterviews(res.data)
      }

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getInterviews(query)
  }, [query])
  useEffect(() => {
    setPageCount(Math.ceil(interviews.length / displayNum))
    setDisplayedUsers(interviews.slice(((page - 1) * displayNum), page * displayNum))
  }, [interviews])

  const handleChange = (event: React.ChangeEvent<unknown>, index: number) => {
    setPage(index);
    setDisplayedUsers(interviews.slice(((index - 1) * displayNum), index * displayNum))
  }

  return (
    <></>
  )
}

export default Interviews
