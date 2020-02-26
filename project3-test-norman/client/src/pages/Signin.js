import React, { useState } from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import WarningIcon from '@material-ui/icons/Warning';
import { Redirect } from 'react-router-dom'
import { createMuiTheme } from 'material-ui/styles';
import API from "../utils/API-User";

const Signin = () => {

  const theme = createMuiTheme();
  const classes = {
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing.unit * 2,
      color: theme.palette.openTitle
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing.unit * 2
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
      <Card style={classes.card}>
        <CardContent>
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
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={clickSubmit} style={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
  }
}

export default Signin;
