import React, { useContext } from "react"
import { Navigate } from "react-router-dom"

import { AuthContext } from "App"

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home: React.FC = () => {
  const { isSignedIn, currentUser, loading } = useContext(AuthContext);

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        return <Navigate to="/signin" />
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <Private>
            <>
              <h1>Signed in successfully!</h1>
              <h2>Email: {currentUser?.email}</h2>
              <h2>Name: {currentUser?.name}</h2>
            </>
          </Private>
        ) : (
          <h1>Not signed in</h1>
        )
      }
    </>
  )
}

export default Home
