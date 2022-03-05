import React, { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { makeStyles, Theme } from "@material-ui/core/styles"
import {
  AppBar,
  Toolbar,
  Box,
  Button,
} from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

// 追加
import { theme } from "styles/layouts/Style"
import { ThemeProvider } from "@material-ui/styles"
import Hidden from '@material-ui/core/Hidden'
import { AuthButtons } from "./Button"

import { signOut } from "lib/api/auth"

import { AuthContext } from "App"

import image from 'img/title-logo.png'

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  linkBtn: {
    textTransform: "none"
  },
  toolBar: {
    justifyContent: 'space-between',
  }
}))

const Header: React.FC = () => {
  const { setIsSignedIn } = useContext(AuthContext)
  const classes = useStyles()
  const navigate = useNavigate()

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
        setIsSignedIn(false)
        navigate("/")
        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
      >
        <Toolbar className={classes.toolBar}>
          <Button
            component={Link}
            to="/"
          >
            <img
              src={image}
              loading="lazy"
              width="200"
            />
          </Button>
          <Box>
            <Hidden xsDown implementation="css">
              <AuthButtons classes={classes} handleSignOut={handleSignOut} />
            </Hidden>
            <Hidden smUp implementation="css">
              <IconButton
                edge="start"
                className={classes.iconButton}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
