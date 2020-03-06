import React from 'react'
import Logo from "../assets/images/Favr Logo.png";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import Handshake from "../assets/images/handshake2.png";
// import { green } from 'material-ui/colors';
// import { lightGreen } from '@material-ui/core/colors';
// import Grid from 'material-ui/Grid'
// import Search from '../components/Search';
// import axios from "axios";
// import { withRouter } from 'react-router-dom';
// import queryString from 'query-string'
// import NSList from "../components/NeedsNServices";


const Title = () => {

    const theme = useTheme();
    const classes = {
        container: {
          backgroundColor: "#565656",
          margin: 'auto',
          textAlign: 'center',
          marginTop: theme.spacing(5),
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: '15px',
          border: "solid 1px #8693AB",
          width: "300px",
          // paddingTop: "200px"
          // opacity: 0.7
          // alignItems: "center",
          // boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0"
        },
        // container: {
        //   background: "url(https://media.giphy.com/media/y30LCMuHRVbxK/giphy.gif)",
        //   backgroundRepeat: "no",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   webkitBackgroundClip: "text",
        //   color: "transparent", 
        //   width: "300px", 
        //   height: "100px", 
        //   boxSizing: "border-box",
        //   // fonSize: 58px;
        //   fontWeight: "bold",
        //   textAlign: "center",
        //   lineHeight: "100px",
        //   flexShrink: "0"
        // },
        img: {
          width: "200px",
          height: "auto",
          textAlign: "center",
          opacity: 1.0
        },
        h3: {
          textAlign: "center",
          color: "rgb(236, 247, 250)",
          // textShadow: "2px 2px 4px #000000"
        },
        handshake: {
          justifyContent: "space-around",
          paddingTop: "110px"
        },
        handshakePic: {
          width: "400px",
          // bottom: 0
        }
      };


    return (
      <React.Fragment>
       <Container style={classes.container}>
            <h3 style={classes.h3}>Welcome to</h3>
            <img src={Logo} alt="logo" style={classes.img} />
            <h3 style={classes.h3}>Login or Register to get started</h3>
       </Container>
       <Grid container justify="center">
        <Grid item style={classes.handshake}>
         <img alt="handshake" src={Handshake} style={classes.handshakePic}/>
        </Grid>
       </Grid>
      </React.Fragment>
    )
};

export default Title;