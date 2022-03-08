import React from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Header from "components/layouts/header/Header"
import Footer from "components/layouts/footer/Footer"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "5rem",
    marginBottom: "10rem"
  }
}))

type CommonLayoutProps = {
  children: React.ReactElement
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  const classes = useStyles()

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="lg" className={classes.container} >
          <Grid container justifyContent="center">
            <Grid item>
              {children}
            </Grid>
          </Grid>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default CommonLayout
