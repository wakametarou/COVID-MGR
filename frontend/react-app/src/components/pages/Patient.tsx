import React, { useCallback, useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

import { userShow } from "lib/api/auth"
import { User, PatientProfile, Interview, OtherSymptom, Answer, Question } from "interfaces/patient"

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { pink } from '@material-ui/core/colors';

import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: 12,
    },
    item: {
      fontSize: 16,
      marginBottom: 5,
      width: 235,
    },
    itemLast: {
      fontSize: 16,
      width: 235,
    },
    itemInterview: {
      fontSize: 16,
    },
    interviewBox: {
      margin: 5,
    },
    cardTitle: {
      margin: 5,
      textAlign: 'center',
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    buttonBox: {
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      width: 90,
      backgroundColor: pink[100],
      boxShadow: "1px 1px 3px 0 grey",
      margin: 30,
    },
  }),
);

const Patient: React.FC = () => {

  const classes = useStyles();

  const [user, setUser] = useState<User>()
  const [patientProfile, setPatientProfile] = useState<PatientProfile>()
  const [interview, setInterview] = useState<Interview>()
  const [otherSymptom, setOtherSymptom] = useState<OtherSymptom>()
  const [answers, setAnswers] = useState<Answer[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const query = useParams();
  const navigate = useNavigate()

  const onClickInterviews = useCallback((id: number) => {
    navigate(`/Interviews/${id}`)
  }, [navigate])

  const getUser = async (query: any) => {
    try {
      const res = await userShow(query.id)
      if (res.data.user) {
        setUser(res.data.user)
        setPatientProfile(res.data.patientProfile)
        setInterview(res.data.interview)
        setOtherSymptom(res.data.otherSymptom)
        setAnswers(res.data.answers)
        setQuestions(res.data.questions)
        console.log("get patients")
      } else {
        console.log("Failed to get the patients")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUser(query)
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

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Card>
          <Typography variant="h6" className={classes.cardTitle}>
            基本情報
          </Typography>
          <CardHeader
            avatar={
              <Avatar alt="Remy Sharp" src={patientProfile?.image} />
            }
          />
          <CardContent>
            <Typography className={classes.title}>
              名前
            </Typography>
            <Typography className={classes.item}>
              {user?.name}様
            </Typography>
            <Typography className={classes.title}>
              メールアドレス
            </Typography>
            <Typography className={classes.item}>
              {user?.email}
            </Typography>
            <Typography className={classes.title}>
              性別
            </Typography>
            {user?.sex ?
              <Typography className={classes.item}>
                男性
              </Typography>
              :
              <Typography className={classes.item}>
                女性
              </Typography>
            }
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card>
          <Typography variant="h6" className={classes.cardTitle}>
            連絡先情報
          </Typography>
          <CardContent>
            <Typography className={classes.title}>
              部屋番号
            </Typography>
            <Typography className={classes.item}>
              {patientProfile?.roomNumber}号室
            </Typography>
            <Typography className={classes.title}>
              電話番号
            </Typography>
            <Typography className={classes.item}>
              {patientProfile?.phoneNumber}
            </Typography>
            <Typography className={classes.title}>
              緊急連絡先
            </Typography>
            <Typography className={classes.item}>
              {patientProfile?.emergencyAddress}
            </Typography>
            <Typography className={classes.title}>
              住所
            </Typography>
            <Typography className={classes.item}>
              {patientProfile?.address}
            </Typography>
            <Typography className={classes.itemLast}>
              {patientProfile?.building}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} >
        <Card>
          <Typography variant="h6" className={classes.cardTitle}>
            最新問診
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <CardContent className={classes.cardContent}>
                <Box className={classes.interviewBox}>
                  <Typography className={classes.title}>
                    名前
                  </Typography>
                  <Typography className={classes.itemInterview}>
                    {user?.name}様
                  </Typography>
                </Box>
                <Box className={classes.interviewBox}>
                  <Typography className={classes.title}>
                    名前
                  </Typography>
                  <Typography className={classes.itemInterview}>
                    {user?.name}様
                  </Typography>
                </Box>
                <Box className={classes.interviewBox}>
                  <Typography className={classes.title}>
                    名前
                  </Typography>
                  <Typography className={classes.itemInterview}>
                    {user?.name}様
                  </Typography>
                </Box>
              </CardContent>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardContent className={classes.cardContent}>
                <Box className={classes.interviewBox}>
                  <Typography className={classes.title}>
                    体温
                  </Typography>
                  <Typography className={classes.itemInterview}>
                    {interview?.temperature}
                  </Typography>
                </Box>
                <Box className={classes.interviewBox}>
                  <Typography className={classes.title}>
                    酸素飽和度
                  </Typography>
                  <Typography className={classes.itemInterview}>
                    {interview?.oxygenSaturation}
                  </Typography>
                </Box>
                <Box className={classes.interviewBox}>
                  <Typography className={classes.title}>
                    計測時間
                  </Typography>
                  <Typography className={classes.itemInterview}>
                    {dayjs(interview?.instrumentationTime).format('HH:mm')}
                  </Typography>
                </Box>
              </CardContent>
            </Grid>
            <Grid item xs={12}>
              <CardContent className={classes.cardContent}>
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
            <Typography variant="h6" className={classes.cardTitle}>
              その他症状
            </Typography>
            <Grid item xs={12}>
              <CardContent>
                <Box className={classes.interviewBox}>
                  <Typography className={classes.title}>
                    痛みの程度
                  </Typography>
                  <Typography className={classes.itemInterview}>
                    {otherSymptom?.painDegree}
                  </Typography>
                </Box>
                <Box className={classes.interviewBox}>
                  <Typography className={classes.title}>
                    症状について
                  </Typography>
                  <Typography className={classes.itemInterview}>
                    {otherSymptom?.concrete}
                  </Typography>
                </Box>

              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid >

      <Grid item xs={12} >
        <Box className={classes.buttonBox}>
          <Button
            className={classes.button}
            component={Link}
            to="/patients"
          >
            患者様一覧
          </Button>
          {user &&
            <Button
              className={classes.button}
              onClick={() => onClickInterviews(user.id)}
            >
              問診一覧
            </Button>
          }
        </Box>
      </Grid>
    </Grid >
  )
}
export default Patient
