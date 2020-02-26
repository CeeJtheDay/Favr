import React, { useState, useEffect } from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import WarningIcon from '@material-ui/icons/Warning';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'
import { Link } from 'react-router-dom'
import { createMuiTheme } from 'material-ui/styles';
import API from "../utils/API-User";
import $ from "jquery";
import Script from 'react-load-script';

const Signup = () => {

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
    name: '',
    password: '',
    email: '',
    intro: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    open: false,
    error: ''
  });


  // useEffect(() => {
  //   const googleScript = document.createElement('script')
  //   googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCy_fsa23_HL03eeIZhtAcxDd8RCmVnogo&libraries=places`
  //   window.document.body.appendChild(googleScript)

  //   googleScript.addEventListener('load',
  //     handleScriptLoad())
  // }, [state]);

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value })
  }


  const handleScriptLoad = () => {
    let autocomplete = new window.google.maps.places.Autocomplete(document.getElementById("street"));
    autocomplete.addListener('place_changed', function () {
      console.log($("#street").val());
      handleAutoComplete($("#street").val())
    });
  };

  const handleAutoComplete = address => {
    var addressComp = address.split(",");
    console.log(addressComp);
    let faddress = {
      street: addressComp[0],
      city: addressComp[1],
      state: addressComp[2]
    };
    setState({ ...state, street: faddress.street, city: faddress.city, state: faddress.state });
  }

  const clickSubmit = () => {
    const user = {
      name: state.name || undefined,
      email: state.email || undefined,
      password: state.password || undefined,
      intro: state.intro,
      street: state.street || undefined,
      city: state.city || undefined,
      state: state.state || undefined,
      zip: state.zip,
    }
    if (!(user.name && user.email && user.password && user.street && user.city && user.state)) {
      setState({ ...state, error: 'please enter all the required queries!' })
    } else {
      API.signup(user)
        .then((data) => {
          setState({ ...state, error: '', open: true })
        })
        .catch(error=>{
          setState({ ...state, error: "please enter a valid email!"})
        })
    }
  }
  return (
    <div>
      <Script
        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCy_fsa23_HL03eeIZhtAcxDd8RCmVnogo&libraries=places"
        onLoad={handleScriptLoad}
      />
      <Card style={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" style={classes.title}>
            Sign Up
          </Typography>
          <TextField id="name" label="Name" style={classes.textField} value={state.name} onChange={handleChange('name')} margin="normal" /><br />
          <TextField id="email" type="email" label="Email" style={classes.textField} value={state.email} onChange={handleChange('email')} margin="normal" /><br />
          <TextField id="password" type="password" label="Password" style={classes.textField} value={state.password} onChange={handleChange('password')} margin="normal" br />
          <TextField id="intro" label="Personal Intro" style={classes.textField} value={state.intro} onChange={handleChange('intro')} margin="normal" /><br />
          <TextField id="street" label="Street" style={classes.textField} value={state.street} onChange={handleChange('street')} margin="normal" /><br />
          <TextField id="city" label="City" style={classes.textField} value={state.city} onChange={handleChange('city')} margin="normal" /><br />
          <TextField id="state" label="State" style={classes.textField} value={state.state} onChange={handleChange('state')} margin="normal" /><br />
          <TextField id="ZIP" label="Zip Code (Optional)" style={classes.textField} value={state.zip} onChange={handleChange('zip')} margin="normal" /><br />
          <br /> {
            state.error && (<Typography component="p" color="error">
              <WarningIcon />
              {state.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={clickSubmit} style={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
      <Dialog open={state.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="raised">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  )

}

export default Signup;
