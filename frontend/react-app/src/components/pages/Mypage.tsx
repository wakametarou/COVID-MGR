import React, { useState, useEffect, useContext } from "react"
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
import { pink } from '@material-ui/core/colors'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
// 自作パレット
import { theme } from "styles/layouts/Style"
import { ThemeProvider } from "@material-ui/styles"
// api取得
import { patientShow } from "lib/api/auth"

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
      marginBottom: 30
    },
    pink: {
      color: theme.palette.getContrastText(pink[500]),
      backgroundColor: pink[100],
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'center'
    },
    button: {
      size: "large",
      backgroundColor: pink[100],
      variant: "contained",
      marginTop: 20
    }
  }),
);


const Mypage: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
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
        setImage(res?.data.image.url)
        setRoomNumber(res?.data.roomNumber)
        setPhoneNumber(res?.data.phoneNumber)
        setEmergencyAddress(res?.data.emergencyAddress)
        setAddress(res?.data.address)
        setBuilding(res?.data.building)
        console.log("get patientprofile")
      } else {
        console.log("user is doctor")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProfils()
  }, [])

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card className={classes.cardRoot}>
            <CardContent className={classes.cardContent}>
              {currentUser?.patientOrDoctor ?
                <Avatar alt="Remy Sharp" src={image} className={classes.large} />
                :
                <Avatar className={classes.pink}>
                  <LocalHospitalIcon />
                </Avatar>
              }
              <Typography variant="h5" component="h2" style={{ marginBottom: 30 }} >
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
            {currentUser?.patientOrDoctor ||
              <CardActions className={classes.cardActions}>
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                >
                  患者様一覧
                </Button>
              </CardActions>
            }
          </Card>
        </Grid>
        {currentUser?.patientOrDoctor &&
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
                  <Button className={classes.button}>
                    編集
                  </Button>
                  <Button className={classes.button}>
                    問診
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        }
      </Grid>
    </ThemeProvider >
  )
}
export default Mypage
