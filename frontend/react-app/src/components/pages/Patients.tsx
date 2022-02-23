import React, { useState, useEffect } from "react"

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { pink } from '@material-ui/core/colors'

import { PatientsIndex } from "interfaces/index"
import { patientsIndex } from "lib/api/auth"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridRoot: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    cardRoot: {
      display: 'flex',
    },
    cardContent: {
      // minWidth: 320,
      display: 'flex',
      justifyContent: 'center',

    },
    listItem: {
      margin: 10,
      // display: 'inherit',
      // justifyContent: 'inherit',
      // textAlign: 'inherit',
    },
    button: {
      // size: "large",
      backgroundColor: pink[100],
      variant: "contained",
      marginTop: 20
    }
  }),
);

const Patients: React.FC = () => {

  const [patients, setPatients] = useState<PatientsIndex[]>([])

  const getUsers = async () => {
    try {
      const res = await patientsIndex()
      if (res) {
        setPatients(res?.data)
        console.log("get patients")
      } else {
        console.log("Failed to get the patients")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid className={classes.gridRoot} item xs={12}>
        <Typography variant="h5" component="h1" style={{ marginBottom: 30 }}>
          患者様一覧
        </Typography>
        {patients.map((patient) => (
          <Card className={classes.cardRoot}>
            <CardContent className={classes.cardContent}>
              <Avatar alt="Remy Sharp" src={patient.image} />
              <Typography className={classes.listItem}>
                名前{patient.name}
              </Typography>
              <Typography className={classes.listItem}>
                性別
              </Typography>
            </CardContent>
            <CardActions>
              <Button className={classes.button}>Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </Grid>
  )
}

export default Patients
