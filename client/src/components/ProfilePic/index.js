import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const classes = {
  root: {
    marginLeft:"auto",
    marginRight: 'auto'
  },
  large: {
    margin: "18px",
    boxShadow: "2px 4px 2px rgb(43,41,44, 0.3)",
    // width: theme.spacing(8),
    // height: theme.spacing(8)
  }
}
export default function ImageAvatars({currUser}) {

  return (
    <div style={classes.root}>
      <Avatar 
      alt="Profile Pic" 
      src={'/uploads/'+currUser.image} 
      style={classes.large} />
    </div>
  );
}