import { useContext } from "react"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import { AuthContext } from "App"

export const AuthButtons = ({ classes, handleSignOut }: any) => {
  const { loading, isSignedIn } = useContext(AuthContext)

  // 認証完了後はサインアウト用のボタンを表示
  // 未認証時は認証用のボタンを表示
  if (!loading) {
    if (isSignedIn) {
      return (
        <Button
          color="inherit"
          className={classes.linkBtn}
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      )
    } else {
      return (
        <>
          <Button
            component={Link}
            to="/signin"
            color="inherit"
            className={classes.linkBtn}
          >
            Sign in
          </Button>
          <Button
            component={Link}
            to="/signup"
            color="inherit"
            className={classes.linkBtn}
          >
            Sign Up
          </Button>
        </>
      )
    }
  } else {
    return <></>
  }
}
