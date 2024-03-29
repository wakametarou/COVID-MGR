import React, { memo, useState, useEffect } from 'react';
import { useNavigate, Link, } from "react-router-dom";
import MultiLineBody from "components/layouts/MultiLineBody/MultiLineBody";
import Loading from "components/layouts/loading/Loading";

import {
  InterviewNewType,
  QuestionType,
  OtherSymptomTypeNew,
  AnswerNewType,
  InterviewCreateType
} from 'types/interview';
import { interviewCreate } from 'lib/api/interview';
import { interviewNew } from 'lib/api/interview';

import {
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { pink } from '@material-ui/core/colors';

import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

const useStyles = makeStyles(() =>
  createStyles({
    titleBox: {
      display: 'flex',
      justifyContent: 'center',
    },
    formBox: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    title: {
      fontSize: 12,
    },
    textField: {
      width: 110,
    },
    contentBox: {
      margin: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    concreteBox: {
      margin: 10,
      display: 'flex',
    },
    unitText: {
      marginLeft: 3,
    },
    questionBox: {
      margin: 30,
    },
    questionsBox: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    otherBox: {
      display: 'flex',
      flexDirection: 'column',
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      width: 100,
      backgroundColor: pink[100],
      margin: 5,
    },
    tempBox: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: 10,
      width: 100,
    },
    tempTitle: {
      fontSize: 12,
      textAlign: 'center',
    },
    textConfirm: {
      marginTop: 5,
      textAlign: 'center',
    },
  }),
);

const InterviewCreate: React.FC = memo(() => {
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [interview, setInterview] = useState<InterviewNewType>({
    temperature: 100,
    oxygenSaturation: 1000,
    instrumentationTime: new Date('2000/12/31 00:00'),
    status: 0,
    other: undefined,
  });
  const [answers, setAnswers] = useState<AnswerNewType[]>([]);
  const [otherSymptom, setOtherSymptom] = useState<OtherSymptomTypeNew>({
    painDegree: 6,
    concrete: "",
  });
  const [temperature, setTemperature] = useState<number>(100);
  const [oxygenSaturation, setOxygenSaturation] = useState<number>(1000);
  const [instrumentationTime, setInstrumentationTime] = useState<Date>(new Date('2000/12/31 00:00'));
  const [other, setOther] = useState<boolean>();
  const [status, setStatus] = useState<number>(0);
  const [buttonDisAllow, setButtonDisAllow] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    ButtonPermit();
  }, [interview, answers, otherSymptom]);
  useEffect(() => {
    handleInterviewChange(temperature, oxygenSaturation, instrumentationTime, other, status)
  }, [temperature, oxygenSaturation, instrumentationTime, other, status]);
  useEffect(() => {
    statusCounter();
  }, [answers]);
  useEffect(() => {
    resetOther();
  }, [other]);
  useEffect(() => {
    getQuestions();
  }, []);

  const classes = useStyles();
  const navigate = useNavigate();

  const getQuestions = async () => {
    try {
      const res = await interviewNew()
      setQuestions(res.data)
      console.log("get Questions.")
    } catch (err) {
      console.log(err)
    };
    setLoading(false)
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params: InterviewCreateType = {
      interview: interview,
      answers: answers,
      otherSymptom: otherSymptom
    };
    try {
      const res = await interviewCreate(params);
      console.log(res);
      navigate("/completed");
    } catch (e) {
      console.log(e);
    };
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const ButtonPermit = () => {
    if (interview.other === true) {
      if (
        interview.temperature !== 100 &&
        interview.oxygenSaturation !== 1000 &&
        interview.instrumentationTime !== new Date('2000/12/31 00:00') &&
        interview.other !== undefined &&
        answers.length === 9 &&
        otherSymptom.painDegree !== 6 &&
        otherSymptom.concrete !== ""
      ) {
        console.log('開く実行')
        setButtonDisAllow(false);
      } else {
        console.log('閉じる実行')
        setButtonDisAllow(true);
      }
    } else if (interview.other === false) {
      if (
        interview.temperature !== 100 &&
        interview.oxygenSaturation !== 1000 &&
        interview.instrumentationTime !== new Date('2000/12/31 00:00') &&
        interview.other !== undefined &&
        answers.length === 9
      ) {
        console.log('開く実行')
        setButtonDisAllow(false)
      } else {
        console.log('閉じる実行')
        setButtonDisAllow(true)
      }
    }
  };

  const statusCounter = () => {
    let count = 1
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].answer === true) {
        count += 1
      }
    };
    setStatus(count)
  };

  const handleInterviewChange = (
    temperature: number,
    oxygenSaturation: number,
    instrumentationTime: Date,
    other: boolean | undefined,
    status: number
  ) => {
    setInterview({
      ...interview,
      temperature: temperature,
      oxygenSaturation: oxygenSaturation,
      instrumentationTime: instrumentationTime,
      other: other,
      status: status,
    });
  };

  const handleAnswersChange = (answer: boolean, id: number) => {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].questionId === id) {
        answers.splice(i, 1)
      }
    }
    setAnswers([
      ...answers,
      {
        answer: answer,
        questionId: id,
      }
    ]);
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOtherSymptom({
      ...otherSymptom,
      [e.target.name]: e.target.value,
    });
  };

  const AnswerSelection = (id: number) => {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].questionId === id) {
        if (answers[i].answer === true) {
          return (
            <Typography className={classes.textConfirm}>
              はい
            </Typography>
          )
        } else if (answers[i].answer === false) {
          return (
            <Typography className={classes.textConfirm}>
              いいえ
            </Typography>
          )
        }
      }
    }
  };

  const resetOther = () => {
    if (other === false) {
      setOtherSymptom({
        painDegree: 6,
        concrete: "",
      });
    };
  };

  if (loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <>
        <Box className={classes.titleBox}>
          <Typography variant="h5" style={{ marginBottom: 30 }}>
            問診記入
          </Typography>
        </Box>
        <Box>
          <form>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box className={classes.formBox}>
                      <Box className={classes.contentBox}>
                        <TextField
                          variant="outlined"
                          required
                          margin="dense"
                          name="temperature"
                          label="体温"
                          type="number"
                          onChange={(e) => setTemperature(Number(e.target.value))}
                          inputProps={{ type: "number" }}
                          className={classes.textField}
                        />
                        <Typography>
                          °C
                        </Typography>
                      </Box>
                      <Box className={classes.contentBox}>
                        <TextField
                          variant="outlined"
                          required
                          margin="dense"
                          name="oxygenSaturation"
                          label="酸素飽和度"
                          onChange={(e) => setOxygenSaturation(Number(e.target.value))}
                          inputProps={{ type: "number" }}
                          className={classes.textField}
                        />
                        <Typography className={classes.unitText}>
                          %
                        </Typography>
                      </Box>
                      <Box className={classes.contentBox}>
                        <TextField
                          variant="outlined"
                          required
                          margin="dense"
                          name="instrumentationTime"
                          label="計測時間"
                          id="time"
                          type="time"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                          onChange={(e) => setInstrumentationTime(new Date('1000/01/01 ' + e.target.value))}
                          className={classes.textField}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box className={classes.questionsBox}>
                      {questions.map((question, index) => (
                        <Box className={classes.questionBox} key={index}>
                          <MultiLineBody body={question.content} />
                          <RadioGroup
                            aria-label="quiz"
                            name="answer"
                            onChange={(e) => handleAnswersChange(e.target.value === "true", question.id)}
                          >
                            <FormControlLabel
                              value="true"
                              control={<Radio />}
                              label="はい"
                            />
                            <FormControlLabel
                              value="false"
                              control={<Radio />}
                              label="いいえ"
                            />
                          </RadioGroup>
                        </Box>
                      ))}
                      <Box className={classes.questionBox}>
                        <Typography>
                          ・その他症状
                        </Typography>
                        <RadioGroup
                          aria-label="quiz"
                          name="other"
                          onChange={(e) => setOther(e.target.value === "true")}
                        >
                          <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="はい"
                          />
                          <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="いいえ"
                          />
                        </RadioGroup>
                      </Box>
                    </Box>
                  </Grid>
                  {interview.other &&
                    <Grid item xs={12}>
                      <Box className={classes.otherBox}>
                        <TextField
                          variant="outlined"
                          required
                          margin="dense"
                          name="painDegree"
                          label="痛みの程度"
                          placeholder="数で入力"
                          onChange={(e) => handleOtherChange(e)}
                          inputProps={{ type: "number" }}
                          className={classes.textField}
                        />
                        <TextField
                          id="outlined-multiline-static"
                          multiline
                          rows={10}
                          variant="outlined"
                          required
                          margin="dense"
                          name="concrete"
                          label="具体的な症状"
                          onChange={(e) => handleOtherChange(e)}
                          inputProps={{ maxLength: 300 }}
                        />
                      </Box>
                    </Grid>
                  }
                </Grid>
              </CardContent>
              <CardActions className={classes.actions}>
                <Button
                  className={classes.button}
                  component={Link}
                  to="/mypage"
                >
                  戻る
                </Button>
                <Button
                  disabled={buttonDisAllow}
                  className={classes.button}
                  onClick={handleClickOpen}
                >
                  確認
                </Button>
              </CardActions>
            </Card>
            <Dialog
              open={open}
              onClose={handleClose}
            >
              <DialogTitle
                className={classes.titleBox}
              >
                問診確認
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box className={classes.formBox}>
                      <Box className={classes.tempBox}>
                        <Typography className={classes.tempTitle}>
                          体温
                        </Typography>
                        <Box className={classes.contentBox}>
                          <Typography>
                            {interview.temperature}
                          </Typography>
                          <Typography className={classes.unitText}>
                            °C
                          </Typography>
                        </Box>
                      </Box>
                      <Box className={classes.tempBox}>
                        <Typography className={classes.tempTitle}>
                          酸素飽和度
                        </Typography>
                        <Box className={classes.contentBox}>
                          <Typography>
                            {interview.oxygenSaturation}
                          </Typography>
                          <Typography className={classes.unitText}>
                            %
                          </Typography>
                        </Box>
                      </Box>
                      <Box className={classes.tempBox}>
                        <Typography className={classes.tempTitle}>
                          計測時間
                        </Typography>
                        <Box className={classes.contentBox}>
                          <Typography>
                            {dayjs(interview.instrumentationTime).format('HH:mm')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box className={classes.questionsBox}>
                      {questions.map((question, index) => (
                        <Box className={classes.questionBox} key={index}>
                          <MultiLineBody body={question.content} />
                          {AnswerSelection(question.id)}
                        </Box>
                      ))}
                      <Box className={classes.questionBox}>
                        <Typography>
                          ・その他症状
                        </Typography>
                        {interview.other
                          ? <Typography className={classes.textConfirm}>
                            はい
                          </Typography>
                          :
                          <Typography className={classes.textConfirm}>
                            いいえ
                          </Typography>
                        }
                      </Box>
                    </Box>
                  </Grid>
                  {interview.other &&
                    <Grid item xs={12}>
                      <Box className={classes.otherBox}>
                        <Box className={classes.tempBox}>
                          <Typography className={classes.tempTitle}>
                            痛みの程度
                          </Typography>
                          <Box className={classes.contentBox}>
                            <Typography>
                              {otherSymptom.painDegree}
                            </Typography>
                          </Box>
                        </Box>
                        <Box className={classes.tempBox}>
                          <Typography className={classes.tempTitle}>
                            具体的な症状
                          </Typography>
                          <Box className={classes.concreteBox}>
                            <Typography>
                              <MultiLineBody body={otherSymptom.concrete} />
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  }
                </Grid>
              </DialogContent>
              <DialogActions className={classes.actions}>
                <Button
                  className={classes.button}
                  onClick={handleClose}
                >
                  戻る
                </Button>
                <Button
                  className={classes.button}
                  type="submit"
                  onClick={handleSubmit}
                >
                  完了
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        </Box>
      </>
    );
  };
});

export default InterviewCreate
