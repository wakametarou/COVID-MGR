import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "App";
import { Link } from "react-router-dom";
import { PatientProfileType } from "types/patient";
import { patientShow } from "lib/api/patient";

import {
  makeStyles, createStyles,
  // Theme
} from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Avatar,
  Box,
  CardHeader,
} from '@material-ui/core';

import { pink } from '@material-ui/core/colors';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      minWidth: 320,
      height: 350,
      display: 'flex',
      flexDirection: 'column',
    },
    cardHeaderBox: {
      display: 'flex',
      justifyContent: 'center',
    },
    image: {
      width: 80,
      height: 80,
    },
    contentBox: {
      marginBottom: 5,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    patientContent: {
      marginBottom: 12,
    },
    userButton: {
      width: 150,
      backgroundColor: pink[100],
      margin: 5,
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'center'
    },
    button: {
      width: 100,
      backgroundColor: pink[100],
      margin: 5,
    },
    box: {
      height: 170,
    },
  }),
);

const Mypage: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState<PatientProfileType>();

  const getProfiles = async () => {
    try {
      const res = await patientShow()
      if (res.data.roomNumber) {
        console.log(res)
        setProfile(res.data)
        console.log("get patientprofile")
      } else {
        console.log("user is doctor")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProfiles()
  }, [])

  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>

        <Card className={classes.card}>
          <Box className={classes.cardHeaderBox}>
            {currentUser?.patientOrDoctor
              ?
              <Avatar alt="Remy Sharp" src={profile?.image} className={classes.image} style={{ backgroundColor: pink[100] }} />
              :
              <LocalHospitalIcon className={classes.image} style={{ color: pink[100] }} />
            }
          </Box>
          <CardContent>
            <Typography variant="h5" style={{ marginBottom: 10 }} >
              {currentUser?.name}
            </Typography>
            <Box className={classes.contentBox}>
              <Typography>
                メールアドレス
              </Typography>
              <Typography>
                {currentUser?.email}
              </Typography>
            </Box>
            <Box className={classes.contentBox}>
              <Typography>
                性別
              </Typography>
              {currentUser?.sex
                ?
                <Typography>
                  男性
                </Typography>
                :
                <Typography>
                  女性
                </Typography>
              }
            </Box>
          </CardContent>
          <CardActions className={classes.cardActions}>
            {currentUser?.patientOrDoctor === false &&
              <Button
                component={Link}
                to="/patients"
                size="large"
                variant="contained"
                className={classes.userButton}
              >
                患者様一覧
              </Button>
            }
          </CardActions>
        </Card>
      </Grid>
      {currentUser?.patientOrDoctor &&
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <Box className={classes.cardHeaderBox}>
              <Typography variant="h5" component="h2" style={{ margin: 25 }}>
                患者様情報
              </Typography>
            </Box>
            <CardContent>
              {profile ?
                <Box className={classes.box}>
                  <Typography className={classes.patientContent}>
                    部屋番号 {profile.roomNumber}
                  </Typography>
                  <Typography className={classes.patientContent}>
                    電話番号 {profile.phoneNumber}
                  </Typography>
                  <Typography className={classes.patientContent}>
                    緊急連絡先 {profile.emergencyAddress}
                  </Typography>
                  <Typography className={classes.patientContent}>
                    住所 {profile.address}{profile?.building}
                  </Typography>
                </Box>
                :
                <Box className={classes.box}>
                  <Typography className={classes.patientContent}>
                    未入力です。
                  </Typography>
                </Box>
              }
            </CardContent>
            <CardActions className={classes.cardActions}>
              {profile ?
                <Button
                  className={classes.button}
                  component={Link}
                  to="/patient/edit"
                >
                  編集
                </Button>
                :
                <Button
                  className={classes.button}
                  component={Link}
                  to="/patient/create"
                >
                  作成
                </Button>
              }
              <Button
                className={classes.button}
                component={Link}
                to="/interview/create"
              >
                問診
              </Button>
            </CardActions>
          </Card>
        </Grid>
      }
    </Grid>
  )
}
export default Mypage
