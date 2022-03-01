import React, { useState } from "react";
import { patientCreate } from "lib/api/patient";
import { PatientProfileType } from "types/patient";
import { useNavigate, Link } from "react-router-dom";

import { makeStyles, createStyles, } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  TextField,
  CardHeader,
  Button,
} from '@material-ui/core';
import { pink } from '@material-ui/core/colors';

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
      justifyContent: 'center',
    },
    button: {
      backgroundColor: pink[100],
      margin: 5,
    },
  }),
);

const PatientCreate: React.FC = () => {
  const classes = useStyles();
  const [profile, setProfile] = useState<PatientProfileType>(
    {
      image: "",
      roomNumber: "",
      phoneNumber: "",
      emergencyAddress: "",
      address: "",
      building: "",
    }
  );
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await patientCreate(profile);
      console.log(res.data);
      navigate("/Mypage");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="患者様情報" />
        <CardContent className={classes.cardContent}>
          <Avatar alt="Remy Sharp" src={profile.image} className={classes.large} />
          <TextField
            variant="outlined"
            required
            fullWidth
            margin="dense"
            name="roomNumber"
            label="部屋番号"
            value={profile.roomNumber}
            onChange={(e) => handleChange(e)}
            inputProps={{ maxLength: 4, pattern: "^[0-9_]+$" }}
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
            inputProps={{ maxLength: 11, pattern: "^[0-9_]+$" }}
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
            inputProps={{ maxLength: 11, pattern: "^[0-9_]+$" }}
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
          <Button
            className={classes.button}
            type="submit"
            onClick={handleSubmit}
          >
            作成
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default PatientCreate
