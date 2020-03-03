import React from 'react'
import Logo from "../assets/images/FavrLogo.png";
import Container from '@material-ui/core/Container';
import { useTheme } from '@material-ui/core/styles';
// import Grid from 'material-ui/Grid'
// import Search from '../components/Search';
// import axios from "axios";
// import { withRouter } from 'react-router-dom';
// import queryString from 'query-string'
// import NSList from "../components/NeedsNServices";


const Title = () => {

    const theme = useTheme();
    const classes = {
        card: {
          backgroundColor: 'darkgrey',
          margin: 'auto',
          textAlign: 'center',
          marginTop: theme.spacing.unit * 5,
          paddingTop: theme.spacing.unit * 2,
          paddingBottom: theme.spacing.unit * 2,
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: '15px'

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


    return (
       <Container id="titleBox" style={classes.card}>
            <h3>So you're looking for a...</h3>
            <img src={Logo} alt="logo" />
            <h3>Login or Register to get started</h3>
       </Container>

    )


};

export default Title;