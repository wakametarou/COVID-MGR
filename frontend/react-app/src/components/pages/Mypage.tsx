import React, { useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "App"

const Mypage: React.FC = () => {
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
    <div></div>
  )
}
export default Mypage
