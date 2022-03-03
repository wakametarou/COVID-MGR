import React, { memo, useState, useEffect, useCallback } from 'react';
import { InterviewNewType, QuestionType, OtherSymptomTypeNew, AnswerNewType } from 'types/interview';
import { interviewNew } from 'lib/api/interview'
import { useNavigate, Link } from "react-router-dom";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme: Theme) =>
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
      alignItems: 'center',
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
    },
    tempTitle: {
      fontSize: 12,
      textAlign: 'center',
    },
  }),
);

const MultiLineBody = ({ body }: { body: string }) => {
  const texts = body.split('\n').map((item, index) => {
    return (
      <React.Fragment key={index}>
        {item}
        <br />
      </React.Fragment>
    );
  });
  return <div>{texts}</div>;
};

const InterviewCreate: React.FC = memo(() => {
  const classes = useStyles();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [interview, setInterview] = useState<InterviewNewType>(
    {
      temperature: 0,
      oxygenSaturation: 0,
      instrumentationTime: new Date(0),
      status: 0,
      other: false,
    }
  );
  const handleInterviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInterview({
      ...interview,
      [e.target.name]: e.target.value,
      other: e.target.value === "true"
    });
  };

  const [otherSymptom, setOtherSymptom] = useState<OtherSymptomTypeNew>(
    {
      painDegree: 0,
      concrete: "",
    }
  );
  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOtherSymptom({
      ...otherSymptom,
      [e.target.name]: e.target.value,
    });
  };

  const [answers, setAnswers] = useState<AnswerNewType[]>([{ answer: false, questionId: 1 }]);
  const handleAnswersChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].questionId === id) {
        answers.splice(i, 1)
      }
      // else {
      //   setAnswers([
      //     ...answers,
      //     {
      //       answer: e.target.value === "true",
      //       questionId: id,
      //     }
      //   ]);
      // }
    }
    setAnswers([
      ...answers,
      {
        answer: e.target.value === "true",
        questionId: id,
      }
    ]);
  };

  const AnswerSelection = useCallback((index: number) => {
    // for (let i = 0; i < answers.length; i++) {
    // if (answers[i].questionId === index + 1) {
    const answer = answers.find(el => el.questionId = index);
    if (answer?.answer === true) {
      return (
        <Typography>
          はい
        </Typography>
      )
    } else if (answer?.answer === false) {
      return (
        <Typography>
          いいえ
        </Typography>
      )
    }
    // }
    // }
  }, [answers]);
  console.log(answers);

  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getQuestions = async () => {
    try {
      const res = await interviewNew()
      setQuestions(res.data)
      console.log("get Questions.")
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    getQuestions()
  }, []);

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
                        onChange={(e) => handleInterviewChange(e)}
                        inputProps={{ maxLength: 2, pattern: "^[0-9_]+$" }}
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
                        onChange={(e) => handleInterviewChange(e)}
                        inputProps={{ maxLength: 3, pattern: "^[0-9_]+$" }}
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
                        onChange={(e) => handleInterviewChange(e)}
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
                          onChange={(e) => handleAnswersChange(e, index + 1)}
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
                        onChange={(e) => handleInterviewChange(e)}
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
                        onChange={(e) => handleOtherChange(e)}
                        inputProps={{ maxLength: 1, pattern: "^[0-5_]+$" }}
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
                        {AnswerSelection(index + 1)}
                        {/* <RadioGroup
                          aria-label="quiz"
                          name="answer"
                          onChange={(e) => handleAnswersChange(e, index + 1)}
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
                        </RadioGroup> */}
                      </Box>
                    ))}
                    <Box className={classes.questionBox}>
                      <Typography>
                        ・その他症状
                      </Typography>
                      <RadioGroup
                        aria-label="quiz"
                        name="other"
                        onChange={(e) => handleInterviewChange(e)}
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
                        onChange={(e) => handleOtherChange(e)}
                        inputProps={{ maxLength: 1, pattern: "^[0-5_]+$" }}
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
              // onClick={handleSubmit}
              >
                確認
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </Box>
    </>
  );
});

export default InterviewCreate
