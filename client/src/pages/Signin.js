import React, { useState } from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import WarningIcon from '@material-ui/icons/Warning';
import { Redirect } from 'react-router-dom'
import API from "../utils/API-User";

const Signin = () => {

  const classes = {
    card: {
      maxWidth: 600,
      height: "auto",
      textAlign: 'center',
      paddingRight: "auto",
      paddingLeft: "auto",
      backgroundColor: "#8693AB",
      borderRadius: "20px",
      border: "inset 1px white",
      margin:"80px 20px"
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      color: "white",
      textShadow: "2px 2px 4px #000000",
      fontWeight: "bold",
      width: "auto",
      flexBox: "center",
    },
    textField: {
      //margin: "10px 30px",
      width: '90%',
      backgroundColor: "#8693AB"
    },
    submit: {
      margin: 'auto',
      marginBottom: "20px",
      backgroundImage: "linear-gradient( #96CDFF 0%, #077699 51%, #96CDFF 100%)",
      border: "solid 1px #96CDFF",
      borderRadius: "15px",
      color: "#07769",
      textShadow: "2px 2px 4px #000000",
      boxShadow: "2px 4px 2px rgb(43,41,44, 0.3)"
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
    setState({ ...state, error:'', [name]: event.target.value })
  }

  if (state.redirectToReferrer) {
    console.log(state);
    return (<Redirect to={`/user/?id=${state.id}`} />)
  } else {
    console.log("here");

    return (
      
      <Card style={classes.card}>
        <CardContent>
          <Typography 
          type="headline" 
          component="h2" 
          style={classes.title}
          >
            Sign In
            </Typography>
          <TextField 
          id="email" 
          type="email" 
          label="Email" 
          style={classes.textField} 
          value={state.email} 
          onChange={handleChange('email')} 
          margin="normal"
          />
          <br />
          <TextField 
          id="password" 
          type="password" 
          label="Password" 
          style={classes.textField} 
          value={state.password} 
          onChange={handleChange('password')} margin="normal" 

          />
          <br /> 
          {state.error && (
            <Typography 
            component="p" 
            color="error">
              <WarningIcon />
              {state.error}
            </Typography>
            )
          }
        </CardContent>
        <CardActions>
          <Button 
          color="primary" 
          variant="raised" 
          onClick={clickSubmit} 
          style={classes.submit}
          >
          Submit
          </Button>
        </CardActions>
      </Card>
    
    )
  }
}

export default Signin;
