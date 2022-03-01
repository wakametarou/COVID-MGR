import React from "react"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Typography,
  Grid,
} from '@material-ui/core'
import { pink } from '@material-ui/core/colors';

import GitHubIcon from '@material-ui/icons/GitHub'
import ContactMailIcon from '@material-ui/icons/ContactMail'

import { theme } from "styles/layouts/Style"


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerStyle: {
      paddingTop: 40,
      backgroundColor: pink[100],
    },
    copyRight: {
      paddingTop: 20,
      paddingBottom: 20,
      textAlign: 'center',
      fontSize: 12,
      backgroundColor: pink[100],
    },
    icon: {
      color: '#000',
    },
  }),
);

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <BottomNavigation
        showLabels
        className={classes.footerStyle}
      >
        <BottomNavigationAction
          label="GitHub"
          icon={<GitHubIcon />}
          href="https://github.com/wakametarou"
          className={classes.icon}
        />
        <BottomNavigationAction
          label="SendMail"
          icon={<ContactMailIcon />}
          className={classes.icon}
          href="mailto:wakame.programing@gmail.com"
        />
      </BottomNavigation>
      <Typography className={classes.copyRight}>
        Copyright © Website 2022 Akira Takano All rights reserved.
      </Typography>
    </>
  )
}

export default Footer
