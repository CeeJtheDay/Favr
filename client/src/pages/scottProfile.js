import React, { useState, useEffect } from 'react'
import Grid from 'material-ui/Grid';
import ProfileHeader from '../components/ProfileHeader/index'
import DisplayList from '../components/DisplayList'
import axios from "axios"
import { withRouter } from 'react-router-dom';
import OtherDisplayList from '../components/DisplayListOther';
const Profile = withRouter(({ history, currUser, setCurrUser }) => {

  const classes = {
    grid: {
      borderRadius: "20px",
      border: "groove 1px rgb(43,41,44, 0.3)",
      backgroundColor: "#8693AB",
      width:"90%",
      marginRight:'auto',
      marginLeft:'auto',
      marginTop:'70px',
      overflow:'auto',
      maxHeight:"80vh",
      minHeight:"80vh"
    }
  }

  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    axios.get('../api/reviews')
      .then(data => {
        console.log(data);
        if (data.data.length > 0) {
          let newList = data.data.filter(obj => obj.reviewee === currUser.id);
          console.log(newList);
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
        time: review.createdAt,
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
    <Grid 
    container sm={12} 
    style={classes.grid}
    >
      <ProfileHeader 
      currUser={currUser} 
      setCurrUser={setCurrUser} 
      />
      {history.location.pathname.includes("/profile") && (
        <DisplayList 
        currUser={currUser} 
        setCurrUser={setCurrUser} 
        reviewList = {reviewList}

        />
        )}
      {history.location.pathname.includes("/other") && (
        <OtherDisplayList 
        currUser={currUser} 
        setCurrUser={setCurrUser} 
        reviewList = {reviewList}

        />
        )}
    </Grid>
  )
})

export default Profile
