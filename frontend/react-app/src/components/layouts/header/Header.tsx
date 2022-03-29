import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Hidden,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { theme } from "styles/layouts/Style";
import { ThemeProvider } from "@material-ui/styles";
import { HeaderButtons } from "./Button";
// import { MenuContent } from "./Menu";

import { signOut } from "lib/api/auth";
import { AuthContext } from "App";

import image from 'img/title-logo.png';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { currentUser, isSignedIn, setIsSignedIn } = useContext(AuthContext)
  const classes = useStyles()
  const navigate = useNavigate()

  const handleSignOut = async (e: React.MouseEvent<HTMLElement>) => {
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
              <HeaderButtons classes={classes} handleSignOut={handleSignOut} />
            </Hidden>
            <Hidden smUp implementation="css">
              <IconButton
                edge="start"
                className={classes.iconButton}
                color="inherit"
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {isSignedIn
                  ?
                  <>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/mypage"
                    >
                      マイページ
                    </MenuItem>
                    {currentUser.patientOrDoctor
                      ?
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/interview/create"
                      >
                        問診入力
                      </MenuItem>
                      :
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/patients"
                      >
                        患者一覧
                      </MenuItem>
                    }
                    <MenuItem
                      onClick={(e) => {
                        handleSignOut(e);
                        handleClose();
                      }}
                    >
                      ログアウト
                    </MenuItem>
                  </>
                  :
                  <>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/signin"
                    >
                      サインイン
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/signup"
                      onClick={handleClose}
                    >
                      サインアップ
                    </MenuItem>
                  </>
                }
              </Menu>
            </Hidden>
          </Box >
        </Toolbar >
      </AppBar >
    </ThemeProvider >
  )
}

export default Header
