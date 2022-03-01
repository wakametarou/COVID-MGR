import React, { useState, useEffect } from "react"
import { patientShow } from "lib/api/patient"
import { PatientProfileType } from "types/patient"
import { Link } from "react-router-dom"

import { makeStyles, createStyles, } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  TextField,
  CardHeader,
  Button,
} from '@material-ui/core';
import { pink } from '@material-ui/core/colors'


const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      minWidth: 320,
    },
    header: {
      textAlign: "center",
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'center'
    },
    button: {
      backgroundColor: pink[100],
      margin: 5,
    },
  }),
);

const PatientEdit: React.FC = () => {
  const [profile, setProfile] = useState<PatientProfileType>({
    id: 0,
    image: { url: "" },
    roomNumber: 0,
    phoneNumber: "",
    emergencyAddress: "",
    address: "",
    building: "",
    userId: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const getProfils = async () => {
    try {
      const res = await patientShow();
      setProfile(res.data);
      console.log("get patientprofile");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProfils();
  }, []);

  const classes = useStyles();

  return (
    <form>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="患者様情報" />
        <CardContent className={classes.cardContent}>
          <Avatar alt="Remy Sharp" src={profile?.image.url} className={classes.large} />
          <TextField
            variant="outlined"
            required
            fullWidth
            margin="dense"
            name="roomNumber"
            label="部屋番号"
            value={profile.roomNumber}
            onChange={(e) => handleChange(e)}
            inputProps={{ maxLength: 4 }}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            margin="dense"
            name="phoneNumber"
            label="電話番号"
            value={profile.phoneNumber}
            onChange={(e) => handleChange(e)}
            inputProps={{ maxLength: 11 }}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            margin="dense"
            name="emergencyAddress"
            label="緊急連絡先"
            value={profile.emergencyAddress}
            onChange={(e) => handleChange(e)}
            inputProps={{ maxLength: 11 }}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            margin="dense"
            name="address"
            label="住所"
            value={profile.address}
            onChange={(e) => handleChange(e)}
            inputProps={{ maxLength: 100 }}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            margin="dense"
            name="building"
            label="建物名、部屋番号"
            value={profile.building}
            onChange={(e) => handleChange(e)}
            inputProps={{ maxLength: 100 }}
          />
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            className={classes.button}
            component={Link}
            to="/mypage"
          >
            戻る
          </Button>
          <Button className={classes.button}>
            編集
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default PatientEdit
