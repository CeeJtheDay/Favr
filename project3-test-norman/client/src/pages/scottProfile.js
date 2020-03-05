import React, { useState, useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles';
import Grid from 'material-ui/Grid'
import ProfileHeader from '../components/ProfileHeader/index'
import DisplayList from '../components/DisaplayList'
import axios from "axios"

const Profile = ({ currUser, setCurrUser }) => {

  const theme = useTheme();
  const classes = {
    list: {
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
      height: '90vh',
      padding: "20px",
      backgroundColor: "#8693AB",
      // borderRadius: "20px",
      border: "inset 1px white",
      overflow:"auto"
    },
    title1: {
      margin: `12px 24px`,
      color: "white",
      textAlign: "center"
      // color: 
    }
  }

  return (
    <Grid style={classes.root1} container item xs={12} spacing={1}>
      <ProfileHeader currUser={currUser} setCurrUser={setCurrUser} />
      <DisplayList currUser={currUser} setCurrUser={setCurrUser} />
    </Grid>
  )
}

export default Profile
