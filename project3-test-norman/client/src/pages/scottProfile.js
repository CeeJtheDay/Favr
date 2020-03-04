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
    root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing.unit * 3,
      marginTop: theme.spacing.unit * 5
    }),
    title: {
      margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
      color: theme.palette.protectedTitle
    },
    root1: theme.mixins.gutters({
      maxWidth: 600,
      margin: '12px 24px',
      padding: theme.spacing.unit * 3,
      backgroundColor: '#3f3f3f0d'
    }),
    title1: {
      margin: `${theme.spacing.unit * 2}px 0 12px ${theme.spacing.unit}px`,
      color: theme.palette.openTitle
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
    <Grid container item xs={12} spacing={3}>
    <Paper >
      <ProfileHeader currUser={currUser} setCurrUser={setCurrUser}></ProfileHeader>
     

      <Grid item xs={12} sm={12}>
        <Paper style={classes.root1} elevation={4}>
          <Typography type="title" style={classes.title1}>
            Needs
  
        </Typography>
          <Grid citem xs={12} sm={12}>
            <NeedsList currUser={currUser} setCurrUser={setCurrUser} />
          </Grid>

        </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
        <Paper style={classes.root1} elevation={4}>
          <Typography type="title" style={classes.title1}>
            Services
        </Typography>
          <Grid item xs={12} sm={12}>
            <OffersList currUser={currUser} setCurrUser={setCurrUser}></OffersList>
          </Grid>

      </Paper>
      </Grid>
      
    </Paper>
<Navbar></Navbar>
    </Grid>
  )
}

export default Profile
