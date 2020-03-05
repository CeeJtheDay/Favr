import React, { useState, useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles';
import Grid from 'material-ui/Grid'
import ProfileHeader from '../components/ProfileHeader/index'
import DisplayList from '../components/DisaplayList'
import axios from "axios"
import { withRouter } from 'react-router-dom';
import OtherDisplayList from '../components/DisaplayListOther';
const Profile = withRouter(({ history, currUser, setCurrUser }) => {

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
      overflow: "auto"
    },
    title1: {
      margin: `12px 24px`,
      color: "white",
      textAlign: "center"
      // color: 
    }
  }

  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    axios.get('../api/reviews')
      .then(data => {
        console.log(data);
        if (data.length > 0) {
          let newList = data.filter(obj => obj.reviwee === currUser.id);
          handleName(newList);
        }
      })
  }, [history.location])

  const handleName = (currList) => {
    let tempChatList = [];
    currList.map(async (review, i) => {
      await ran(currList, review, tempChatList);
    })
  }

  function ran(currList, review, tempChatList) {
    return new Promise(resolve => {
      let tempChatObj = {
        id: review._id,
        rate: review.rate,
        comment: review.comment,
        reviewer: { id: review.reviewer},//add image here later
        reviewee: { id: review.reviewee, name:currUser.name, image:currUser.image }
      };
      axios.get(`../api/users/${review.reviewer}`)
        .then(data1 => {
          console.log(data1.data);
          tempChatObj.reviewer.name = data1.data.name;
          tempChatObj.reviewer.image = data1.data.image; //add image here later
          tempChatList.push(tempChatObj);
          console.log(tempChatList);
          if (tempChatList.length === currList.length) {
            console.log(tempChatList);
            setReviewList(tempChatList);
          }
        })
    })
  }


  return (
    <Grid style={classes.root1} container item xs={12} spacing={1}>
      <ProfileHeader currUser={currUser} setCurrUser={setCurrUser} />
      {history.location.pathname.includes("/profile") && (<DisplayList currUser={currUser} setCurrUser={setCurrUser} reviewList = {reviewList}/>)}
      {history.location.pathname.includes("/other") && (<OtherDisplayList currUser={currUser} setCurrUser={setCurrUser} reviewList = {reviewList}/>)}
    </Grid>
  )
})

export default Profile
