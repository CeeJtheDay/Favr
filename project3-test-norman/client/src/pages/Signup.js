import React, { useState } from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import WarningIcon from '@material-ui/icons/Warning';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'
import { Link } from 'react-router-dom'
// import { createMuiTheme } from 'material-ui/styles';
import { useTheme } from '@material-ui/core/styles';

import API from "../utils/API-User";
import $ from "jquery";
import Script from 'react-load-script';
import axios from "axios";
// import PropTypes from "prop-types";


const Signup = () => {

  const theme = useTheme();
  const classes = {
    card: {
      maxHeight: "600px",
      overflow: "auto",
      marginRight: '20px',
      marginLeft: '20px',
      textAlign: 'center',
      marginTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2,
      paddingRight: "auto",
      paddingLeft: "auto",
      backgroundColor: "#8693AB",
      borderRadius: "20px",
      border: "inset 1px white",
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
    // $("#street").val(faddress.street);
    // $("#city").val(faddress.city);
    // $("#state").val(faddress.street);

    setState({...state, street: faddress.street, city: faddress.city, state: faddress.state });
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
      let address = user.street + " " + user.city + " " + user.state;
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCy_fsa23_HL03eeIZhtAcxDd8RCmVnogo`)
        .then(data1 => {
          let temp = data1.data.results[0].geometry.location;
          console.log(temp);
          user.lat = temp.lat;
          user.lng = temp.lng;
          API.signup(user)
            .then((data) => {
              setState({ ...state, error: '', open: true })
            })
            .catch(error => {
              console.log(error);
              if(error.message.includes("400")) setState({ ...state, error: "Please enter a valid email!" });
              else setState({ ...state, error: "Email has been registered!" })
            })
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
          <Typography
            type="headline"
            component="h2"
            style={classes.title}>
            Sign Up
          </Typography>
          <form className={classes.root} noValidate autoComplete="on">

            <TextField
              id="name"
              label="Name (Required)"
              InputProps={{
                className: classes.textField
              }}
              style={classes.textField}
              value={state.name}
              onChange={handleChange('name')} margin="normal" />
            <br />
            <TextField
              id="email"
              type="email"
              label="Email (Required)"
              style={classes.textField}
              value={state.email}
              onChange={handleChange('email')} margin="normal" />
            <br />
            <TextField
              id="password"
              type="password"
              label="Password (Required)"
              style={classes.textField}
              value={state.password}
              onChange={handleChange('password')} margin="normal" />
            <br />
            <TextField
              id="intro"
              label="Personal Intro (Optional)"
              style={classes.textField}
              value={state.intro}
              onChange={handleChange('intro')} margin="normal" />
            <br />
            <TextField
              id="street"
              label="Street (Required)"
              style={classes.textField}
              value={state.street}
              onChange={handleChange('street')} margin="normal" />
            <br />
            <TextField
              id="city"
              label="City (Required)"
              style={classes.textField}
              value={state.city}
              onChange={handleChange('city')} margin="normal" />
            <br />
            <TextField
              id="state"
              label="State (Required)"
              style={classes.textField}
              value={state.state}
              onChange={handleChange('state')} margin="normal" />
            <br />
            <TextField
              id="ZIP"
              label="Zip Code (Optional)"
              style={classes.textField}
              value={state.zip}
              onChange={handleChange('zip')} margin="normal" />
          </form>
          <br />
          <br />
          {
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
    //   <div>
    //     <Script
    //       url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCy_fsa23_HL03eeIZhtAcxDd8RCmVnogo&libraries=places"
    //       onLoad={handleScriptLoad}
    //     />
    //     <Card >
    //       <CardContent>
    //         <Typography type="headline" component="h2" >
    //           Sign Up
    //         </Typography>
    //         <TextField id="name" label="Name"  value={state.name} onChange={handleChange('name')} margin="normal" /><br />
    //         <TextField id="email" type="email" label="Email" value={state.email} onChange={handleChange('email')} margin="normal" /><br />
    //         <TextField id="password" type="password" label="Password" value={state.password} onChange={handleChange('password')} margin="normal" br />
    //         <TextField id="intro" label="Personal Intro" value={state.intro} onChange={handleChange('intro')} margin="normal" /><br />
    //         <TextField id="street" label="Street" value={state.street} onChange={handleChange('street')} margin="normal" /><br />
    //         <TextField id="city" label="City" value={state.city} onChange={handleChange('city')} margin="normal" /><br />
    //         <TextField id="state" label="State" value={state.state} onChange={handleChange('state')} margin="normal" /><br />
    //         <TextField id="ZIP" label="Zip Code (Optional)" value={state.zip} onChange={handleChange('zip')} margin="normal" /><br />
    //         <br /> {
    //           state.error && (<Typography component="p" color="error">
    //             <WarningIcon />
    //             {state.error}</Typography>)
    //         }
    //       </CardContent>
    //       <CardActions>
    //         <Button color="primary" variant="raised" onClick={clickSubmit}>Submit</Button>
    //       </CardActions>
    //     </Card>
    //     <Dialog open={state.open} disableBackdropClick={true}>
    //       <DialogTitle>New Account</DialogTitle>
    //       <DialogContent>
    //         <DialogContentText>
    //           New account successfully created.
    //         </DialogContentText>
    //       </DialogContent>
    //       <DialogActions>
    //         <Link to="/signin">
    //           <Button color="primary" autoFocus="autoFocus" variant="raised">
    //             Sign In
    //           </Button>
    //         </Link>
    //       </DialogActions>
    //     </Dialog>
    //   </div>
    // )
  )
}

export default Signup;
