import React, { useState, useEffect } from "react"

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { pink } from '@material-ui/core/colors'

import Pagination from '@material-ui/lab/Pagination';

import { PatientsIndex } from "interfaces/index"
import { patientsIndex } from "lib/api/auth"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    cardRoot: {
      display: 'flex',
      marginBottom: 10,
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    listItem: {
      margin: 15,
      width: 90,
      textAlign: 'center',
    },
    listRoomNumber: {
      margin: 15,
      width: 90,
      textAlign: 'center',
    },
    button: {
      width: 90,
      backgroundColor: pink[100],
      variant: "contained",
      boxShadow: "1px 1px 3px 0 grey",
    },
    statusBox: {
      textAlign: 'center',
      margin: 5,
      width: 90,
    },
    statusText: {
      fontSize: 13,
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
    statusColor: {
      fontSize: 14,
    },
    paginationRoot: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
    itemBlock: {
      display: 'flex',
      justifyContent: 'space-around',
      width: 320,
    },
    avatar: {
      display: 'flex',
      justifyContent: 'center',
      width: 90,
      margin: 10
    },
  }),
);

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<PatientsIndex[]>([])//全データ
  const [page, setPage] = useState<number>(1) //ページ番号
  const [pageCount, setPageCount] = useState<number>()//ページ数
  const [displayedPatients, setDisplayedPatients] = useState<PatientsIndex[]>([])//表示データ
  const displayNum = 5; //1ページあたりの項目数

  const getUsers = async () => {
    try {
      const res = await patientsIndex()
      if (res) {
        setPatients(res?.data)
        console.log("get patients")
      } else {
        console.log("Failed to get the patients")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    setPageCount(Math.ceil(patients.length / displayNum))
    setDisplayedPatients(patients.slice(((page - 1) * displayNum), page * displayNum))
  }, [patients])

  const handleChange = (event: React.ChangeEvent<unknown>, index: number) => {
    //ページ移動時にページ番号を更新
    setPage(index);
    //ページ移動時に表示データを書き換える
    setDisplayedPatients(patients.slice(((index - 1) * displayNum), index * displayNum))
  }

  const classes = useStyles();

  console.log(displayedPatients)
  console.log(page)
  console.log(pageCount)

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h1" style={{ marginBottom: 30 }}>
        患者様一覧
      </Typography>
      {displayedPatients.map((patient, index) => (
        <Card className={classes.cardRoot} key={index}>

          <CardContent className={classes.cardContent}>

            <div className={classes.itemBlock}>
              <div className={classes.avatar}>
                <Avatar alt="Remy Sharp" src={patient.image} />
              </div>
              <Typography className={classes.listItem}>
                {patient.name}
              </Typography>
              {patient.sex ?
                <Typography className={classes.listItem}>
                  男性
                </Typography>
                :
                <Typography className={classes.listItem}>
                  女性
                </Typography>
              }
            </div>


            <div className={classes.itemBlock}>
              {patient.roomNumber ?
                <Typography className={classes.listItem}>
                  {patient.roomNumber}
                </Typography>
                :
                <Typography className={classes.listItem}>
                  未入力
                </Typography>
              }
              <div className={classes.statusBox}>
                <div className={classes.statusText}>
                  状態
                </div>
                {(() => {
                  if (patient.status >= 4) {
                    return <div className={classes.statusRed}></div>
                  } else if (patient.status >= 3) {
                    return <div className={classes.statusOrange}></div>
                  } else if (patient.status >= 2) {
                    return <div className={classes.statusYellow}></div>
                  } else if (patient.status >= 1) {
                    return <div className={classes.statusGreen}></div>
                  } else {
                    return <div className={classes.statusColor}>未入力</div>
                  }
                })()}
              </div>
              <CardActions>
                <Button className={classes.button}>詳細</Button>
              </CardActions>
            </div>

          </CardContent>

        </Card>

      ))}
      <div className={classes.paginationRoot}>
        <Pagination
          count={pageCount}
          color="secondary"
          onChange={handleChange}
          page={page}
        />
      </div>
    </div>
  )
}

export default Patients
