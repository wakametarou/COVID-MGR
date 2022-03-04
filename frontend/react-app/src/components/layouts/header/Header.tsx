import React, { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"

import { theme } from "styles/layouts/Style"
import { ThemeProvider } from "@material-ui/styles"
import Hidden from '@material-ui/core/Hidden'
import { HeaderButtons } from "./Button"

import { signOut } from "lib/api/auth"

import { AuthContext } from "App"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textDecoration: "none",
      color: "inherit",
    },
    toolbar: {
      justifyContent: 'space-between',
    },
    box: {
      width: 110,
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
      <AppBar position="static">
        <Toolbar
          className={classes.toolbar}
        >
          <Box className={classes.box}>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className={classes.title}
            >
              COVID-Mgr
            </Typography>
          </Box>

          <Hidden xsDown implementation="css">
            <HeaderButtons classes={classes} handleSignOut={handleSignOut} />
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
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
