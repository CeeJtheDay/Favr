import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
const Profileimage = {
    // if user.profilepic exists, then image = this.profile image
    // else, Profileimage = "../img/defaultPic"
}
const useStyles = makeStyles(theme => ({
  root: {
    marginLeft:"auto",
    marginRight: 'auto'
  },
  large: {
    marginLeft:"auto",
    marginRight: 'auto',
    marginTop:"auto",
    marginBottom: 'auto',
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));
export default function ImageAvatars({currUser}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar alt="Profile Pic" src={'/uploads/'+currUser.image} className={classes.large} />
    </div>
  );
}