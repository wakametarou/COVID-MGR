import React from "react";
// import ReactLoading from "react-loading";
import { BoxLoading } from 'react-loading-typescript';

import {
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import {
  Box,
  Typography,
} from '@material-ui/core';
import { pink } from '@material-ui/core/colors';

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      height: "45vh",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    // typography: {

    // },
  }),
);

const Loading: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography variant="h5" >
        読み込み中です…
      </Typography>
      <BoxLoading
        type="spin"
        color={pink[100]}
        height="100px"
        width="100px"
      />
    </Box>
  );
};

export default Loading
