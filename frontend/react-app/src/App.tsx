import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import CommonLayout from "components/layouts/CommonLayout"
import Home from "components/pages/Home"
import SignUp from "components/pages/SignUp"
import SignIn from "components/pages/SignIn"
import Mypage from "components/pages/Mypage"
import Patients from "components/pages/Patients"
import Patient from "components/pages/Patient"
import Interviews from "components/pages/Interviews"
import Interview from "components/pages/Interview"

import { getCurrentUser } from "lib/api/auth"
import { UserType } from "types/index"

// グローバルで扱う変数・関数
export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: UserType | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | undefined>>
})

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<UserType | undefined>()

  const LoginCheck = ({ component }: { component: JSX.Element }): JSX.Element => {
    if (isSignedIn) {
      return <>{component}</>
    } else {
      return <Home />
    }
  }

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()
      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)
        console.log(res?.data.data)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [])

  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
        <CommonLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/mypage" element={LoginCheck({ component: <Mypage /> })} />
            <Route path="/patients" element={LoginCheck({ component: <Patients /> })} />
            <Route path="/patient/:id" element={LoginCheck({ component: <Patient /> })} />
            <Route path="/interviews/:id" element={LoginCheck({ component: <Interviews /> })} />
            <Route path="/interview/:id" element={LoginCheck({ component: <Interview /> })} />
          </Routes>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  )
}

export default App
