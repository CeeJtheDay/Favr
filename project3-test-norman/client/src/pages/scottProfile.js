import React, { useState, useEffect } from 'react'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Person from 'material-ui-icons/Person'
import Divider from 'material-ui/Divider'
import { createMuiTheme } from 'material-ui/styles'
import NSList from '../components/NeedsNServices/index'
import Grid from 'material-ui/Grid'
import VirtualizedList from '../components/ProfileList/scottList'



const Profile = ({ currUser, setCurrUser }) => {
  const theme = createMuiTheme();
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
      margin: `${theme.spacing.unit * 2}px 0 12px ${theme.spacing.unit}px` ,
      color: theme.palette.openTitle
    }
  }

  const [state, setState] = useState({
    orders: []
  });

  useEffect(() => {
    console.log(currUser);
    let currOrders = currUser.orders;
    console.log(currOrders);
    setState({ ...state, orders: currOrders })
  }, [])


  return (
    <Paper style={classes.root} elevation={4}>
      <Typography type="title" style={classes.title}>
        Profile
        </Typography>
      
      <Paper style={classes.root1} elevation={4}>
        <Typography type="title" style={classes.title1}>
          Needs and Services
        </Typography>
        <Grid container item xs={12} spacing={3}> 
            <VirtualizedList></VirtualizedList>
        </Grid>
        
      </Paper>
    </Paper>
  )
}

export default Profile
