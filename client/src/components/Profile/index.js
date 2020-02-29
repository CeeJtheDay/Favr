import React from 'react';
import ProfileHeader from "../ProfileHeader/index"


export default function Profile() {
    const classes = useStyles();
  
    return (
      <ProfileHeader/>
      <ProfileLists/>
    );
  }