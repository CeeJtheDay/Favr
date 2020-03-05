import React, { useState } from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import WarningIcon from '@material-ui/icons/Warning';
import { Redirect } from 'react-router-dom'
// import { createMuiTheme } from 'material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import API from "../utils/API-User";

const Signin = () => {

  const theme = useTheme();
  const classes = {
    card: {
      // maxWidth: 600,
      height: "auto",
      margin: 'auto',
      textAlign: 'center',
      marginTop: "80px",
      marginBottom: "80px",
      // paddingBottom: ""
      paddingRight: "auto",
      paddingLeft: "auto",
      backgroundColor: "#8693AB",
      borderRadius: "20px",
      border: "inset 1px white",
      marginRight:"auto",
      marginLeft:"auto"
      // display: "flex"
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: "20px",
      color: "white",
      // backgroundColor: "#96CDFF",
      // border: "solid 1px #077699",
      // borderRadius: "15px",
      width: "auto",
      flexBox: "center",
      // backgroundImage: "linear-gradient(to right, #96CDFF 0%, #077699 51%, #96CDFF 100%)"
     
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300,
      color: "secondary",
      border: "white",
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing.unit * 2,
      backgroundImage: "linear-gradient(to right, #96CDFF 0%, #077699 51%, #96CDFF 100%)",
      border: "solid 1px #077699",
      borderRadius: "15px"
    }
  };

  const [state, setState] = useState({
    id: '',
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  });

  const clickSubmit = () => {
    const user = {
      email: state.email || undefined,
      password: state.password || undefined
    }

    API.login(user).then((data) => {
      if (data.error) {
        console.log(data.error)
        setState({ ...state, error: data.error })
      } else {
        console.log(data.data.user._id);
        setState({ ...state, id: data.data.user._id, redirectToReferrer: true })
      }
    })
    .catch(err=>{
      setState({ ...state, error: "Wrong Password and Email!" })
    })
  }

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value })
  }

  if (state.redirectToReferrer) {
    console.log(state);
    return (<Redirect to={`/user/?id=${state.id}`} />)
  } else {
    console.log("here");

    return (
      <div style={classes.card}>
      {/* // <Card style={classes.card}> */}
        {/* // <CardContent> */}
          <Typography type="headline" component="h2" style={classes.title}>
            Sign In
            </Typography>
          <TextField id="email" type="email" label="Email" style={classes.textField} value={state.email} onChange={handleChange('email')} margin="normal" /><br />
          <TextField id="password" type="password" label="Password" style={classes.textField} value={state.password} onChange={handleChange('password')} margin="normal" />
          <br /> {
            state.error && (<Typography component="p" color="error">
              <WarningIcon />
              {state.error}
            </Typography>)
          }
        {/* // </CardContent> */}
        {/* // <CardActions> */}
          <Button color="primary" variant="raised" onClick={clickSubmit} style={classes.submit}>Submit</Button>
        {/* // </CardActions> */}
      {/* // </Card> */}
      </div>
    )
  }
}

export default Signin;
