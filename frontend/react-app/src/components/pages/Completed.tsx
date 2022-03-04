import React from 'react';
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
} from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import { makeStyles, createStyles, } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    boxLayout: {
      marginBottom: 60,
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginBottom: 10,
    },
    button: {
      width: 100,
      backgroundColor: pink[100],
      margin: 5,
    },
    typography: {
      margin: 5,
      fontSize: 18,
    },
  }),
);

const Completed: React.FC = () => {
  const classes = useStyles()
  return (
    <Box className={classes.boxLayout}>
      <Card style={{ padding: 40 }}>
        <CardContent className={classes.card}>
          <Typography className={classes.typography}>
            問診の作成完了です。<br />
            引き続き、<br />療養に専念してください。
          </Typography>
        </CardContent>
        <CardActions className={classes.card}>
          <Button
            className={classes.button}
            component={Link}
            to="/mypage"
          >
            マイページへ
          </Button>
        </CardActions>
      </Card >
    </Box>
  )
};

export default Completed
