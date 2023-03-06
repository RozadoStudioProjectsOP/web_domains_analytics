import React from 'react'
import { Button } from 'reactstrap'
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    buttons: {
        "& > Button": {
            margin: 10,
        }
    }
  })

const Main = () => {
    const classes = useStyles();

  return (
    <div className={classes.main}>
        <h1>Web Domain Analytics</h1>
        <div className={classes.buttons}>
            <Button>Login</Button>
            <Button>Register</Button>
        </div>
    </div>
  )
}

export default Main