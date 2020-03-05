import React, { useState, useEffect } from 'react'
import Paper from 'material-ui/Paper'
// import List, { ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
// import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
// import Person from 'material-ui-icons/Person'
// import Divider from 'material-ui/Divider'
// import { createMuiTheme } from 'material-ui/styles'
import { useTheme } from '@material-ui/core/styles';
// import NSList from '../components/NeedsNServices/index'
import Grid from 'material-ui/Grid'
import OffersList from '../components/ProfileList/scottList'
import ProfileHeader from '../components/ProfileHeader/index'
import Popover from "../components/Popover/index"
// import { StylesProvider } from '@material-ui/core/styles';
import Navbar from "../components/Navbar/index"
// import NSList from "../components/NeedsNServices/index"
import NeedsList from "../components/ProfileList/needsList"



const Profile = ({ currUser, setCurrUser }) => {
  console.log("PROFILE CURRUSER", currUser);
  const theme = useTheme();
  const classes = {
    list:{
      margin: "5px",
      backgroundColor: "#8693AB"
    },
    root: {
      maxWidth: 600,
      margin: 'auto',
    },
    title: {
      margin: `12px 24px`,
      // color: theme.palette.protectedTitle
    },
    root1: {
      maxWidth: 600,
      margin: '20px auto 20px auto',
      padding: "40px",
      backgroundColor: "#8693AB",
      borderRadius: "20px",
      border: "inset 1px white"
    },
    title1: {
      margin: `12px 24px`,
      color: "white",
      textAlign: "center"
      // color: 
    }
  }

  const [state, setState] = useState({
    orders: []
  });

  useEffect(() => {
    // console.log(currUser);
    let currOrders = currUser.orders;
    // console.log(currOrders);
    setState({ ...state, orders: currOrders })
  }, [])


  return (
    <Grid style={classes.root1} container item xs={12} spacing={3}>
    {/* <Paper > */}
      <ProfileHeader currUser={currUser} setCurrUser={setCurrUser} />
      <Grid item xs={6} sm={6}>
        {/* <Paper style={classes.root} elevation={4}> */}
            <Typography type="title" style={classes.title1}>
              Needs
            </Typography>
            {/* <Grid item xs={12} sm={12}> */}
            <NeedsList style={classes.list} currUser={currUser} setCurrUser={setCurrUser} />

        {/* </Paper> */}
      </Grid>
        {/* </Grid> */}
        <Grid item xs={6} sm={6}>
          {/* <Paper style={classes.root} elevation={4}> */}
              <Typography type="title" style={classes.title1}>
                Services
              </Typography>
              {/* <Grid item xs={12} sm={12}> */}
              <OffersList style={classes.list} currUser={currUser} setCurrUser={setCurrUser} />
              {/* </Grid> */}
          {/* </Paper> */}
      </Grid>
      
      <Navbar />
    {/* </Paper> */}
    </Grid>
  )
}

export default Profile
