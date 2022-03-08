import React, { memo, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, Link, } from "react-router-dom";

import { AuthContext } from "App";
import { InterviewType, UserType } from "types/interview";
import { interviewsIndex, interviewsIndexUser } from "lib/api/interview";

import {
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { pink } from '@material-ui/core/colors';

import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

const useStyles = makeStyles(() =>
  createStyles({
    box: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    interviewBox: {
      minHeight: 510,
    },
    boxBottom: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 30,
    },
    card: {
      display: 'flex',
      marginBottom: 10,
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'center',
    },
    title: {
      fontSize: 12,
    },
    listItem: {
      width: 90,
      textAlign: 'center',
    },
    contentBox: {
      display: "flex",
      flexDirection: 'column',
      alignItems: 'center',
      margin: 5,
      width: 90,
    },
    statusRed: {
      height: 25,
      width: 45,
      backgroundColor: "red",
      border: "1px solid #bdbdbd",
      boxShadow: "1px 1px 3px 0 grey",
    },
    statusOrange: {
      height: 25,
      width: 45,
      backgroundColor: "#fb8500",
      border: "1px solid #bdbdbd",
      boxShadow: "1px 1px 3px 0 grey",
    },
    statusYellow: {
      height: 25,
      width: 45,
      backgroundColor: "#f9f800",
      border: "1px solid #bdbdbd",
      boxShadow: "1px 1px 3px 0 grey",
    },
    statusGreen: {
      height: 25,
      width: 45,
      backgroundColor: "#9ef01a",
      border: "1px solid #bdbdbd",
      boxShadow: "1px 1px 3px 0 grey",
    },
    button: {
      width: 90,
      backgroundColor: pink[100],
      boxShadow: "1px 1px 3px 0 grey",
      margin: 15,
    },
    downButton: {
      width: 100,
      backgroundColor: pink[100],
      margin: 5,
      boxShadow: "1px 1px 3px 0 grey",
    },
  }),
);

const Interviews: React.FC = memo(() => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState<UserType>({
    id: 0,
    name: "",
  });
  const [interviews, setInterviews] = useState<InterviewType[]>([]);
  const [page, setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>();
  const [displayedInterviews, setDisplayedInterviews] = useState<InterviewType[]>([]);
  const displayNum = 5;
  const navigate = useNavigate();
  const query = useParams();

  const onClickPatient = useCallback((id: number) => {
    navigate(`/patient/${id}`);
  }, [navigate]);

  const onClickInterview = useCallback((id: number) => {
    navigate(`/interview/${id}`);
  }, [navigate]);

  const getInterviews = async () => {
    try {
      const res = await interviewsIndex();
      setInterviews(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const getInterviewsUser = async (query: any) => {
    try {
      const res = await interviewsIndexUser(query.id);
      setInterviews(res.data.interviews);
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    };
  };

  useEffect(() => {
    if (currentUser.patientOrDoctor) {
      getInterviews();
    } else {
      getInterviewsUser(query);
    };
  }, [currentUser, query]);

  useEffect(() => {
    if (interviews) {
      setPageCount(Math.ceil(interviews.length / displayNum))
      setDisplayedInterviews(interviews.slice(((page - 1) * displayNum), page * displayNum))
    };
  }, [interviews]);

  const handleChange = (event: React.ChangeEvent<unknown>, index: number) => {
    setPage(index);
    setDisplayedInterviews(interviews.slice(((index - 1) * displayNum), index * displayNum));
  };

  const classes = useStyles();

  return (
    <>
      <Box className={classes.box}>
        {currentUser.patientOrDoctor
          ?
          <Typography variant="h5" component="h1" style={{ marginBottom: 30 }}>
            {currentUser.name}様の問診一覧
          </Typography>
          :
          <Typography variant="h5" component="h1" style={{ marginBottom: 30 }}>
            {user?.name}様の問診一覧
          </Typography>
        }
      </Box>
      <Box className={classes.box}>
        <Box className={classes.interviewBox}>
          {displayedInterviews.map((interview, index) => (
            <Card className={classes.card} key={index}>
              <Grid container justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <CardContent className={classes.cardContent}>
                    <Typography className={classes.listItem} style={{ marginTop: 15 }}>
                      {dayjs(interview.createdAt).format('M/D')}
                    </Typography>
                    <Box className={classes.contentBox}>
                      <Typography className={classes.title}>
                        体温
                      </Typography>
                      <Typography className={classes.listItem}>
                        {interview.temperature}°C
                      </Typography>
                    </Box>
                    <Box className={classes.contentBox}>
                      <Typography className={classes.title}>
                        酸素飽和度
                      </Typography>
                      <Typography className={classes.listItem}>
                        {interview.oxygenSaturation}%
                      </Typography>
                    </Box>
                  </CardContent>
                </Grid>
                <Grid item xs={12} sm={6} >
                  <Box className={classes.cardContent}>
                    <CardContent className={classes.cardContent}>
                      <Box className={classes.contentBox}>
                        <Typography className={classes.title}>
                          計測時間
                        </Typography>
                        <Typography className={classes.listItem}>
                          {dayjs(interview.instrumentationTime).format('HH:mm')}
                        </Typography>
                      </Box>
                      <Box className={classes.contentBox}>
                        <Typography className={classes.title}>
                          状態
                        </Typography>
                        {(() => {
                          if (interview.status >= 5) {
                            return <Box className={classes.statusRed} />
                          } else if (interview.status >= 4) {
                            return <Box className={classes.statusOrange} />
                          } else if (interview.status >= 3) {
                            return <Box className={classes.statusYellow} />
                          } else if (interview.status >= 1) {
                            return <Box className={classes.statusGreen} />
                          }
                        })()}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        className={classes.button}
                        onClick={() => onClickInterview(interview.id)}
                      >
                        詳細
                      </Button>
                    </CardActions>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          ))
          }
        </Box>
        <Pagination
          count={pageCount}
          color="secondary"
          onChange={handleChange}
          page={page}
        />
      </Box >
      <Box className={classes.boxBottom}>
        {currentUser.patientOrDoctor
          ?
          <>
            <Button
              className={classes.downButton}
              component={Link}
              to="/mypage"
            >
              マイページへ
            </Button>
            <Button
              className={classes.downButton}
              component={Link}
              to="/interview/create"
            >
              問診作成
            </Button>
          </>
          :
          <Button
            className={classes.downButton}
            onClick={() => onClickPatient(user?.id)}
          >
            患者様一覧
          </Button>
        }
      </Box>
    </>
  )
});

export default Interviews
