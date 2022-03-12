import React, { memo, useState, useEffect, useCallback } from "react";
import { useNavigate, Link, } from "react-router-dom";
import Loading from "components/layouts/loading/Loading";

import { patientShow, patientUpdate } from "lib/api/patient";
import { PatientProfileType } from "types/patient";

import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  TextField,
  CardHeader,
  Button,
  Box,
} from '@material-ui/core';
import { pink } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
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
      width: 100,
      backgroundColor: pink[100],
      margin: 5,
    },
  }),
);

const PatientEdit: React.FC = memo(() => {
  const [loading, setLoading] = useState<boolean>(true);
  const classes = useStyles();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<PatientProfileType>(
    {
      image: undefined,
      roomNumber: "",
      phoneNumber: "",
      emergencyAddress: "",
      address: "",
      building: "",
    }
  );
  const [preview, setPreview] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [emergencyAddress, setEmergencyAddress] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [building, setBuilding] = useState<string>("");
  const [buttonDisAllow, setButtonDisAllow] = useState<boolean>(true);

  useEffect(() => {
    getProfils();
  }, []);

  useEffect(() => {
    setRoomNumber(profile.roomNumber)
    setPhoneNumber(profile.phoneNumber)
    setEmergencyAddress(profile.emergencyAddress)
    setAddress(profile.address)
    setBuilding(profile.building)
  }, [profile]);

  useEffect(() => {
    ButtonPermit();
  }, [roomNumber, phoneNumber, emergencyAddress, address, building]);

  const getProfils = async () => {
    try {
      const res = await patientShow();
      setProfile(res.data.profile);
    } catch (e) {
      console.log(e);
    };
    setLoading(false)
  };

  const createFormData = (): FormData => {
    const formData = new FormData()
    formData.append("roomNumber", roomNumber)
    formData.append("phoneNumber", phoneNumber)
    formData.append("emergencyAddress", emergencyAddress)
    formData.append("address", address)
    formData.append("building", building)
    if (image) formData.append("image", image)
    return formData
  };

  const handleSubmit = async () => {
    const data = createFormData()
    try {
      const res = await patientUpdate(data);
      console.log(res)
      navigate("/Mypage");
    } catch (e) {
      console.log(e);
    }
  };

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0]
    setImage(file)
  }, []);

  const previewImage = useCallback((e) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
  }, []);

  const ButtonPermit = () => {
    if (
      roomNumber !== "" &&
      phoneNumber !== "" &&
      emergencyAddress !== "" &&
      address !== "" &&
      building !== ""
    ) {
      setButtonDisAllow(false);
    } else {
      setButtonDisAllow(true);
    };
  };

  const ImagePreview = (preview: string) => {
    if (preview) {
      return (
        <Avatar alt="Remy Sharp" src={preview} className={classes.large} />
      );
    } else {
      return (
        <Avatar alt="Remy Sharp" src={profile?.image} className={classes.large} />
      );
    };
  };

  if (loading) {
    return (
      <Loading />
    );
  } else {
    return (
      <form>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="患者様情報" />
          <CardContent className={classes.cardContent}>
            {ImagePreview(preview)}
            <Box>
              <label htmlFor="icon-button-file">
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    uploadImage(e)
                    previewImage(e)
                  }}
                />
              </label>
            </Box>
            <TextField
              variant="outlined"
              required
              fullWidth
              margin="dense"
              name="roomNumber"
              label="部屋番号"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              inputProps={{ type: "number" }}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              margin="dense"
              name="phoneNumber"
              label="電話番号"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              inputProps={{ type: "number" }}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              margin="dense"
              name="emergencyAddress"
              label="緊急連絡先"
              value={emergencyAddress}
              onChange={(e) => setEmergencyAddress(e.target.value)}
              inputProps={{ type: "number" }}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              margin="dense"
              name="address"
              label="住所"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              margin="dense"
              name="building"
              label="建物名、部屋番号"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
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
              disabled={buttonDisAllow}
              className={classes.button}
              onClick={handleSubmit}
            >
              編集
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };
});

export default PatientEdit
