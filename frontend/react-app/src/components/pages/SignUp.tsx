import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"

import { AuthContext } from "App"
import AlertMessage from "components/utils/AlertMessage"
import { signUp } from "lib/api/auth"
import { SignUpParams } from "interfaces/index"

// ラジオボタン
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Hidden } from "@material-ui/core"
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6)
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400
  }
}))

// サインアップ用ページ
const SignUp: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  // user
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [patientOrDoctor, setPatientOrDoctor] = useState<boolean>(false)
  const [sex, setSex] = useState<boolean>(false)
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  // patient
  const [room_number, setRoom_number] = useState<number>(0)


  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      // 追加
      patientOrDoctor: patientOrDoctor,
      sex: sex
    }

    try {
      const res = await signUp(params)
      console.log(res)

      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        navigate("/")

        console.log("Signed in successfully!")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  // ラジオボタン
  const handlePatientOrDoctorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPatientOrDoctor(event.target.value === "true");
  };
  const handleSexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSex(event.target.value === "true");
  };

  const inputValid = (input: number) => {
    return isNaN(input) ? 0 : input;

    // if (isNaN(input)) {
    //   return 0;
    // }
    // return input;
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Sign Up" />
          <CardContent>
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              onChange={handlePatientOrDoctorChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="患者様"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="医療従事者"
              />
            </RadioGroup>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="名前"
              value={name}
              margin="dense"
              onChange={event => setName(event.target.value)}
            />
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              onChange={handleSexChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="男性"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="女性"
              />
            </RadioGroup>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            />
            {patientOrDoctor &&
              <TextField
                variant="outlined"
                required
                fullWidth
                label="部屋番号"
                value={room_number === 0 ? '' : room_number}
                margin="dense"

                onChange={event => setRoom_number(inputValid(Number(event.target.value)))}
              // onChange={event => setRoom_number(Number(event.target.value))}
              />
            }
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワードを再入力してください"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="default"
              disabled={!name || !email || !password || !passwordConfirmation ? true : false}
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid emai or password"
      />
    </>
  )
}

export default SignUp
