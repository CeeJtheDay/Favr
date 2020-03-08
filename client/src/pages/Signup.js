import React, { useState } from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import WarningIcon from '@material-ui/icons/Warning';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'
import { Link } from 'react-router-dom'
import Alert from "../components/Alert";
import API from "../utils/API-User";
import $ from "jquery";
import Script from 'react-load-script';
import axios from "axios";


const Signup = () => {

  const classes = {
    card: {
      maxWidth: 600,
      textAlign: 'center',
      paddingRight: "auto",
      paddingLeft: "auto",
      backgroundColor: "#8693AB",
      borderRadius: "20px",
      border: "inset 1px white",
      margin:"80px 20px",
      maxHeight: "85vh",
      marginBottom:"0px",
      overflow:'auto'
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: "20px",
      color: "white",
      textShadow: "2px 2px 4px #000000",
      fontWeight: "bold",
      width: "auto",
      flexBox: "center",
    },
    textField: {
      //margin: "0 30px",
      width: '90%',
    },
    submit: {
      margin: '10px auto',
      backgroundImage: "linear-gradient( #96CDFF 0%, #077699 51%, #96CDFF 100%)",
      border: "solid 1px #96CDFF",
      borderRadius: "15px",
      color: "white",
      textShadow: "2px 2px 4px #000000",
      boxShadow: "2px 4px 2px rgb(43,41,44, 0.3)"
    },
    picUpload: {
      maxWidth: 300,
      textAlign: "center",
      border: "groove 1px rgb(43,41,44, 0.3)",
      backgroundColor: "rgb(43,41,44, 0.3)",
      borderRadius: "20px",
      margin: "0 auto",
      color: "white"
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
    image:'blank-template.jpg',
    open: false,
    error: ''
  });

  const [imagedata, setImageData] = useState({
    success: "",
    error: ""
  });

  const handleSubmitImage = event => {
    event.preventDefault();
    console.log(new FormData(event.target));
    fetch(event.target.action, {
      method: 'POST',
      encType: "multipart/form-data",
      body: new FormData(event.target) // event.target is the form
    }).then((resp) => {
      return resp.json(); // or resp.text() or whatever the server sends
    }).then((body) => {
      console.log(body);
      if (body.err) {
        setImageData({ success: "", error: body.err });
      } else {
        console.log(body.name);
        setState({...state,image:body.name});
        setImageData({ success: body.message, error: "" });
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  const clearAlert = event => {
    setImageData({ success: "", error: "" });
  };

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
      image: state.image,
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
          console.log(user);
          API.signup(user)
            .then((data) => {
              setState({ ...state, error: '', open: true })
            })
            .catch(error => {
              console.log(error);
              if (error.message.includes("400")) setState({ ...state, error: "Please enter a valid email!" });
              else setState({ ...state, error: "Email has been registered!" })
            })
        })
    }
  }

  return (
    
  
    <React.Fragment>
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
          <br/>
          <form 
          id="imageSubmit" 
          action="/upload" 
          method="POST" 
          encType="multipart/form-data" 
          onSubmit={handleSubmitImage} 
          style={classes.picUpload}
          >
          
                <div 
                className="form-group">
                    <label 
                    htmlFor="pic"
                    >
                    Upload Profile Image (Optional):</label>
                    <input 
                    type="file" 
                    className="form-control-file" 
                    name="userImage" 
                    id="upload" 
                    onChange={clearAlert}
                    ></input>
                </div>
                <button 
                className="btn btn-success" 
                type="submit"
                style={classes.submit}
                >
                Upload(Upload Before Submit)
                </button>
                <Alert 
                type="danger" 
                style={{ display: imagedata.error ? 'block' : 'none', marginBottom: 10 }}>
                    {imagedata.error}
                </Alert>
                <Alert 
                type="success" 
                style={{ display: imagedata.success ? 'block' : 'none', marginBottom: 10 }}
                >
                    {imagedata.success}
                </Alert>
            </form>
          {
            state.error && (
              <Typography 
              component="p"
               color="error"
               >
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
      <Dialog 
      open={state.open} 
      disableBackdropClick={true}>
        <DialogTitle>
        New Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link 
          to="/signin"
          >
            <Button 
            color="primary" 
            autoFocus="autoFocus" 
            variant="raised"
            >
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </React.Fragment>

  )
}

export default Signup;
