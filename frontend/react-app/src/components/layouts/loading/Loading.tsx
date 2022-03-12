import React from "react";

import {
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import {
  Box,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      height: "45vh",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    typography: {

    },
  }),
);

const Loading: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography variant="h5" >
        読み込み中です…
      </Typography>
    </Box>
  );
};

export default Loading
