import React, { useState, useEffect, useCallback } from "react"
import { InterviewType, OtherSymptomType, AnswerType, QuestionType } from "types/interview"
import { interviewShow } from "lib/api/interview"
import { useParams, useNavigate } from "react-router-dom"

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
    boxBottom: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 30,
    },
    button: {
      width: 90,
      backgroundColor: pink[100],
      boxShadow: "1px 1px 3px 0 grey",
    },
    cardTitle: {
      width: 90,
      textAlign: 'center',
    },
    interviewBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 5,
    },
    title: {
      fontSize: 12,
    },
    item: {
      fontSize: 16,
      width: 80,
      textAlign: 'center',
    },
    otherItem: {
      fontSize: 16,
      // width: 80,
      // whiteSpace: 'pre-wrap',
      textAlign: 'center',
    },
    itemInterview: {
      fontSize: 16,
    },
    cardContent: {
      display: 'flex',
      // justifyContent: 'center',
      flexWrap: 'wrap',
    },

    interviewContent: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    contentBox: {
      display: "flex",
      flexDirection: 'column',
      alignItems: 'center',
      margin: 5,
      width: 80,
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
  }),
);

const Interview: React.FC = () => {
  const [interview, setInterview] = useState<InterviewType>()
  const [otherSymptom, setOtherSymptom] = useState<OtherSymptomType>()
  const [answers, setAnswers] = useState<AnswerType[]>([])
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const query = useParams();
  const navigate = useNavigate()

  const onClickInterviews = useCallback((id: number) => {
    navigate(`/Interviews/${id}`)
  }, [navigate])

  const getInterview = async (query: any) => {
    try {
      const res = await interviewShow(query.id)
      if (res.data.interview.other) {
        setInterview(res.data.interview)
        setOtherSymptom(res.data.other)
        setAnswers(res.data.answers)
        setQuestions(res.data.questions)
        console.log("get interview and otherSymptom")
      } else {
        setInterview(res.data.interview)
        setAnswers(res.data.answers)
        setQuestions(res.data.questions)
        console.log("get interview")
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getInterview(query)
  }, [query])

  const fechAnswers = (questionId: number) => {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].questionId === questionId) {
        return (
          <>
            {answers[i].answer ?
              <Typography className={classes.itemInterview}>
                はい
              </Typography>
              :
              <Typography className={classes.itemInterview}>
                いいえ
              </Typography>
            }
          </>
        )
      }
    }
  }

  const classes = useStyles();

  return (
    <>
      <Box className={classes.box}>
        <Typography variant="h5" component="h1" style={{ marginBottom: 30 }}>
          問診詳細
        </Typography>
      </Box>
      <Box className={classes.box}>
        <Card>
          <Typography className={classes.cardTitle} style={{ marginTop: 15 }}>
            問診作成日
          </Typography>
          <Typography className={classes.item}>
            {dayjs(interview?.createdAt).format('HH:mm')}
          </Typography>
          <Grid container >
            <Grid item xs={12} >
              <CardContent className={classes.cardContent}>
                <Box className={classes.interviewBox}>
                  <Typography className={classes.title}>
                    体温
                  </Typography>
                  <Typography className={classes.item}>
                    {interview?.temperature}
                  </Typography>
                </Box>
                <Box className={classes.interviewBox}>
                  <Typography className={classes.title}>
                    酸素飽和度
                  </Typography>
                  <Typography className={classes.item}>
                    {interview?.oxygenSaturation}
                  </Typography>
                </Box>
                <Box className={classes.interviewBox}>
                  <Typography className={classes.title}>
                    計測時間
                  </Typography>
                  <Typography className={classes.item}>
                    {dayjs(interview?.instrumentationTime).format('HH:mm')}
                  </Typography>
                </Box>
                <Box className={classes.contentBox}>
                  <Typography className={classes.title}>
                    状態
                  </Typography>
                  {interview &&
                    (() => {
                      if (interview.status >= 4) {
                        return <Box className={classes.statusRed} />
                      } else if (interview.status >= 3) {
                        return <Box className={classes.statusOrange} />
                      } else if (interview.status >= 2) {
                        return <Box className={classes.statusYellow} />
                      } else if (interview.status >= 1) {
                        return <Box className={classes.statusGreen} />
                      }
                    })()
                  }
                </Box>
              </CardContent>
            </Grid>
            <Grid item xs={12}>
              <CardContent className={classes.interviewContent}>
                {questions.map((question, index) => (
                  <Box className={classes.interviewBox} key={index}>
                    <Typography className={classes.title}>
                      {question.name}
                    </Typography>
                    {fechAnswers(question.id)}
                  </Box>
                ))}
              </CardContent>
            </Grid>
            <Grid item xs={12}>
              {interview?.other &&
                <>
                  <Typography className={classes.cardTitle} style={{ marginTop: 15 }}>
                    その他症状
                  </Typography>
                  <CardContent className={classes.cardContent}>
                    <Box className={classes.interviewBox}>
                      <Typography className={classes.title}>
                        痛みの程度
                      </Typography>
                      <Typography className={classes.item}>
                        {otherSymptom?.painDegree}
                      </Typography>
                    </Box>
                    <Box className={classes.interviewBox}>
                      <Typography className={classes.title}>
                        詳細
                      </Typography>
                      <Typography className={classes.otherItem}>
                        {otherSymptom?.concrete.replace(/\n/g, '<br />')}
                      </Typography>
                    </Box>
                  </CardContent>
                </>
              }
            </Grid>
          </Grid>
        </Card>
      </Box>
      <Box className={classes.boxBottom}>
        {interview &&
          <Button
            className={classes.button}
            onClick={() => onClickInterviews(interview.userId)}
          >
            問診一覧
          </Button>
        }
      </Box>
    </>
  )
}
export default Interview
