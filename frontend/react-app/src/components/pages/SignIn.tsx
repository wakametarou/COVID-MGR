import React, { memo, useState, useContext } from "react";
import { useNavigate, Link, } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthContext } from "App";
import AlertMessage from "components/utils/AlertMessage";
import { signIn } from "lib/api/auth";
import { SignInParamsType } from "types/index";

import {
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Button,
  Box,
} from "@material-ui/core";

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
  },
  box: {
    marginTop: "2rem"
  },
  link: {
    textDecoration: "none"
  },
}));

const SignIn: React.FC = memo(() => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const params: SignInParamsType = {
      email: email,
      password: password
    };

    try {
      const res = await signIn(params)
      console.log(res)
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])
        setIsSignedIn(true)
        setCurrentUser(res.data.data)
        navigate("/mypage")
        console.log("Signed in successfully!")
      } else {
        setAlertMessageOpen(true)
      };
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    };
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="サインイン" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              placeholder="6文字以上入力してください"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="default"
              disabled={!email || !password ? true : false}
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              サインイン
            </Button>
            <Box textAlign="center" className={classes.box}>
              <Typography variant="body2">
                アカウントをお持ちではありませんか? &nbsp;<br />
                <Link to="/signup" className={classes.link}>
                  アカウントの作成はこちら
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="入力した値に誤りがあります。"
      />
    </>
  );
});

export default SignIn
