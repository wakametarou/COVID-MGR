import React from "react"

import {
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';

import imageTop from 'img/photo01.jpg'
import imageHome from 'img/home-logo.png'
import imageDoctor from 'img/Doctors-pana.png'

const useStyles = makeStyles(() =>
  createStyles({
    topBox: {
      backgroundImage: `url(${imageTop})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '90vw',
      height: '50vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentBox: {
      marginTop: 10,
      display: 'flex',
      justifyContent: 'center',
    },
    imageGrid: {
      display: 'flex',
      justifyContent: 'center',
    },
    mainText: {
      marginTop: 50,
      fontSize: 18,
    },
    bottomBox: {
      marginTop: 30,
      display: 'flex',
      justifyContent: 'center',
    },
    text: {
      marginTop: 30,
      textAlign: 'center',
    },
  }),
);

const Home: React.FC = () => {
  const classes = useStyles()

  return (
    <Box>
      <Box className={classes.topBox}>
        <img
          src={imageHome}
          loading="lazy"
          width="300"
          height="70"
        />
      </Box>
      <Box className={classes.contentBox}>
        <Grid container >
          <Grid item xs={12} sm={6} className={classes.imageGrid}>
            <img
              src={imageDoctor}
              loading="lazy"
              width="300"
              height="230"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.mainText}>
              このCOVID-MgrはCOVID-19感染者が<br />ホテル療養を受ける際の問診を効率を上げるシステム。<br />
              ホテル療養を実際に体験した経験の元、<br />固定電話での問診や対応の必要無い患者様の手間を軽減。<br />
              医療従事者への負担の軽減を目的としています。
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.bottomBox}>
        <Typography className={classes.text}>
          システムに関する質問や対応、作成者に関しては<br />
          下部からご連絡ください。
        </Typography>
      </Box>
    </Box>
  )
}

export default Home
