import React from 'react'
import Logo from "../assets/images/Favr Logo.png";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import Handshake from "../assets/images/handshake2.png";



const Title = () => {

    const theme = useTheme();
    const classes = {
        container: {
          backgroundColor: "#565656",
          margin: 'auto',
          textAlign: 'center',
          marginTop: "100px",
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: '15px',
          border: "solid 1px #8693AB",
          width: "300px",
        },
        img: {
          width: "200px",
          height: "auto",
          textAlign: "center",
          opacity: 1.0
        },
        h3: {
          textAlign: "center",
          color: "rgb(236, 247, 250)",
        },
        handshake: {
          justifyContent: "space-around",
          paddingTop: "110px"
        },
        handshakePic: {
          width: "400px",
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