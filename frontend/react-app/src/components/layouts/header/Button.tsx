import { useContext } from "react"
import { Link } from "react-router-dom"
import {
  Button,
  IconButton,
} from "@material-ui/core"
import {
  AccountCircle,
  ExitToApp,
  Assignment,
  Hotel,
  PersonAdd,
  MeetingRoom,
} from '@material-ui/icons';
import { AuthContext } from "App"

export const HeaderButtons = ({ classes, handleSignOut }: any) => {
  const { loading, currentUser, isSignedIn } = useContext(AuthContext)

  // 認証完了後はサインアウト用のボタンを表示
  // 未認証時は認証用のボタンを表示
  if (!loading) {
    if (isSignedIn) {
      return (
        <>
          <IconButton
            component={Link}
            to="/mypage"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          {currentUser.patientOrDoctor
            ?
            <IconButton
              component={Link}
              to="/interview/create"
              color="inherit"
            >
              <Assignment />
            </IconButton>
            :
            <IconButton
              component={Link}
              to="/patients"
              color="inherit"
            >
              <Hotel />
            </IconButton>
          }
          <IconButton
            color="inherit"
            className={classes.linkBtn}
            onClick={handleSignOut}
          >
            <ExitToApp />
          </IconButton>
        </>
      )
    } else {
      return (
        <>
          <IconButton
            component={Link}
            to="/signin"
            color="inherit"
          >
            <MeetingRoom />
          </IconButton>
          <IconButton
            component={Link}
            to="/signup"
            color="inherit"
          >
            <PersonAdd />
          </IconButton>
        </>
      )
    }
  } else {
    return <></>
  }
}
