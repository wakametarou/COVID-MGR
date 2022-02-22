import React, { useState, useEffect, useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "App"

// mui
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'

// 自作パレット
import { theme } from "styles/layouts/Style"
import { ThemeProvider } from "@material-ui/styles"

import { patientShow } from "lib/api/auth"
// import { PatientParams } from "interfaces/index"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardRoot: {
      minWidth: 320,
      height: 350
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    pos: {
      marginBottom: 12,
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginBottom: 50
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }),
);


const Mypage: React.FC = () => {
  const { isSignedIn, currentUser, loading } = useContext(AuthContext);
  const [image, setImage] = useState<string>("")
  const [roomNumber, setRoomNumber] = useState<number>(0)
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [emergencyAddress, setEmergencyAddress] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [building, setBuilding] = useState<string>("")

  const getProfils = async () => {
    try {
      const res = await patientShow()
      if (res.data.roomNumber) {
        console.log(res)
        setImage(res?.data.image)
        setRoomNumber(res?.data.roomNumber)
        setPhoneNumber(res?.data.phoneNumber)
        setEmergencyAddress(res?.data.emergencyAddress)
        setAddress(res?.data.address)
        setBuilding(res?.data.building)
        console.log("get patientprofile")
      } else {
        console.log("Failed in get patientprofile")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProfils()
  }, [])

  // // ユーザーが認証済みかどうかでルーティングを決定
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

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Private>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card className={classes.cardRoot}>
              <CardContent className={classes.cardContent}>
                {currentUser?.patientOrDoctor &&
                  <Avatar alt="Remy Sharp" className={classes.large} />
                }
                <Typography variant="h5" component="h2" style={{ marginBottom: 30 }}>
                  {currentUser?.name}
                </Typography>
                <Typography className={classes.pos}>
                  メールアドレス {currentUser?.email}
                </Typography>
                {currentUser?.sex ?
                  <Typography className={classes.pos}>
                    性別 男性
                  </Typography>
                  :
                  <Typography className={classes.pos}>
                    性別 女性
                  </Typography>
                }
              </CardContent>
            </Card>
          </Grid>
          {currentUser?.patientOrDoctor ?
            <Grid item xs={12} sm={6}>
              <Card className={classes.cardRoot}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="h5" component="h2" style={{ marginBottom: 20 }}>
                    患者様情報
                  </Typography>
                  <Typography className={classes.pos}>
                    部屋番号 {roomNumber}
                  </Typography>
                  <Typography className={classes.pos}>
                    電話番号 {phoneNumber}
                  </Typography>
                  <Typography className={classes.pos}>
                    緊急連絡先 {emergencyAddress}
                  </Typography>
                  <Typography className={classes.pos}>
                    住所 {address}{building}
                  </Typography>
                  <CardActions>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      style={{ marginTop: 20 }}
                    >
                      編集
                    </Button>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      style={{ marginTop: 20 }}
                    >
                      問診
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
            :
            <Grid item xs={12} sm={6}>
              <Card className={classes.cardRoot}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    医療
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    color="default"
                    size="small"
                    variant="contained"
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          }
        </Grid>
      </Private>
    </ThemeProvider>
  )
}
export default Mypage
