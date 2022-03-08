import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "App";
import { PatientProfileType } from "types/patient";
import { patientShow } from "lib/api/patient";

import {
  makeStyles,
  createStyles,
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
} from '@material-ui/core';

import { pink } from '@material-ui/core/colors';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      minWidth: 320,
      height: 420,
      display: 'flex',
      flexDirection: 'column',
    },
    cardHeaderBox: {
      display: 'flex',
      justifyContent: 'center',
    },
    image: {
      marginTop: 30,
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
      flexDirection: 'column',
      justifyContent: 'center',
    },
    button: {
      width: 100,
      backgroundColor: pink[100],
      margin: 5,
    },
    box: {
      height: 170,
    },
    downBox: {

    },
  }),
);

const Mypage: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState<PatientProfileType>();
  const [interview, setInterview] = useState<number>(0);

  const getProfiles = async () => {
    try {
      const res = await patientShow()
      console.log(res)
      if (res.data.interview) {
        setInterview(res.data.interview)
        setProfile(res.data.profile)
      } else {
        setProfile(res.data.profile)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProfiles()
  }, []);

  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>

        <Card className={classes.card}>
          <Box className={classes.cardHeaderBox}>
            {currentUser.patientOrDoctor
              ?
              <Avatar alt="Remy Sharp" src={profile?.image} className={classes.image} style={{ backgroundColor: pink[100] }} />
              :
              <LocalHospitalIcon className={classes.image} style={{ color: pink[100] }} />
            }
          </Box>
          <CardContent>
            <Typography variant="h5" style={{ marginBottom: 10 }} >
              {currentUser.name}
            </Typography>
            <Box className={classes.contentBox}>
              <Typography>
                メールアドレス
              </Typography>
              <Typography>
                {currentUser.email}
              </Typography>
            </Box>
            <Box className={classes.contentBox}>
              <Typography>
                性別
              </Typography>
              {currentUser.sex
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
            {currentUser.patientOrDoctor === false &&
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
      {currentUser.patientOrDoctor &&
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
              <Box className={classes.downBox}>
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
                  問診作成
                </Button>
              </Box>
              {interview !== 0 &&
                <Box className={classes.downBox}>
                  <Button
                    className={classes.button}
                    component={Link}
                    to="/interviews"
                  >
                    問診一覧
                  </Button>
                </Box>
              }
            </CardActions>
          </Card>
        </Grid>
      }
    </Grid>
  )
}
export default Mypage
