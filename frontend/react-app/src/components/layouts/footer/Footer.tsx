import React from "react"
import { makeStyles, Theme } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import GitHubIcon from '@material-ui/icons/GitHub'
import ContactMailIcon from '@material-ui/icons/ContactMail'
// 自作パレット
import { theme } from "styles/layouts/Style"
import { ThemeProvider } from "@material-ui/styles"

const useStyles = makeStyles((theme: Theme) => ({
  footerStyle: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    height: 145,
    justifyContent: 'space-between',
    backgroundColor: 'primary',
    position: "static",
  },
  copyRight: {
    marginTop: 10,
    marginBottom: 15,
    textAlign: 'center',
  }
}))

const Footer: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.footerStyle}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction label="GitHub" icon={<GitHubIcon />} />
          <BottomNavigationAction label="SendMail" icon={<ContactMailIcon />} />
        </BottomNavigation>
        <div className={classes.copyRight}>
          Copyright © Website 2022 Akira Takano All rights reserved.
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Footer
