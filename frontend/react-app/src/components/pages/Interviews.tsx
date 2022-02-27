import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "App";
import { useNavigate, useParams } from "react-router-dom";

import { InterviewType } from "types/interview";
import { interviewsIndex, interviewsIndexUser } from "lib/api/auth";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import { pink } from '@material-ui/core/colors';

import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
      marginRight: 20,
    },
  }),
);

const Interviews: React.FC = () => {
  const { currentUser } = useContext(AuthContext)
  const [interviews, setInterviews] = useState<InterviewType[]>([])
  const [page, setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>()
  const [displayedInterviews, setDisplayedInterviews] = useState<InterviewType[]>([])
  const displayNum = 5;
  const navigate = useNavigate()
  const query = useParams();

  const saveInterviews = (res: InterviewType[]) => {
    if (res) {
      setInterviews(res)
      console.log("get interviews")
    } else {
      console.log("Failed to get the interviews")
    }
  }
  const getInterviews = async (query: any) => {
    try {
      if (currentUser?.patientOrDoctor) {
        const res = await interviewsIndex()
        saveInterviews(res.data)
      } else {
        const res = await interviewsIndexUser(query.id)
        saveInterviews(res.data)
      }

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getInterviews(query)
  }, [query])
  useEffect(() => {
    setPageCount(Math.ceil(interviews.length / displayNum))
    setDisplayedInterviews(interviews.slice(((page - 1) * displayNum), page * displayNum))
  }, [interviews])

  const handleChange = (event: React.ChangeEvent<unknown>, index: number) => {
    setPage(index);
    setDisplayedInterviews(interviews.slice(((index - 1) * displayNum), index * displayNum))
  }

  const classes = useStyles();

  return (
    <Box className={classes.box}>
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
                      if (interview.status >= 4) {
                        return <Box className={classes.statusRed} />
                      } else if (interview.status >= 3) {
                        return <Box className={classes.statusOrange} />
                      } else if (interview.status >= 2) {
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
                  // onClick={() => onClickPatient(user.id)}
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
      <Pagination
        count={pageCount}
        color="secondary"
        onChange={handleChange}
        page={page}
      />
    </Box >
  )
}

export default Interviews
