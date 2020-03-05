import React, { useState, useEffect } from 'react';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Person from 'material-ui-icons/Person';
import Divider from 'material-ui/Divider';
// import { createMuiTheme } from 'material-ui/styles'
// import { useTheme } from '@material-ui/core/styles';


const Profile = ({ currUser, setCurrUser }) => {
  // const theme = useTheme();
  const classes = {
    root: {
    // theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      // padding: theme.spacing(3),
      // marginTop: theme.spacing(5)
    },
    title: {
      // margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
      // color: theme.palette.protectedTitle
    },
    root1: theme.mixins.gutters({
      maxWidth: 600,
      margin: '12px 24px',
      padding: theme.spacing(3),
      backgroundColor: '#3f3f3f0d'
    }),
    title1: {
      margin: `${theme.spacing(2)}px 0 12px ${theme.spacing(1)}px` ,
      color: theme.palette.openTitle
    }
  }

  const [state, setState] = useState({
    offers: [],
    needs:[]  
  });

  useEffect(() => {
    console.log(currUser);
    let currOffers = currUser.offers;
    console.log(currOffers);
    setState({ ...state, offers: currOffers })
  }, [])


  return (
    <Paper style={classes.root} elevation={4}>
      <Typography type="title" style={classes.title}>
        Profile
        </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={currUser.name} secondary={currUser.email} />
        </ListItem>
        <Divider />
      </List>
      <Paper style={classes.root1} elevation={4}>
        <Typography type="title" style={classes.title1}>
          Your Orders
        </Typography>
        <List dense>
          {state.offers.map((offer, i) => {
            return <span key={i}>
              <a href={offer.link} target="_blank">
                <ListItem button>
                  <ListItemText primary={<strong>{offer}</strong>} secondary={`quantity: ${offer.quantity} price: $${offer.price}`} />
                </ListItem>
              </a>
              <Divider />
            </span>
          })}
        </List>
      </Paper>
    </Paper>
  )
}

export default Profile;
