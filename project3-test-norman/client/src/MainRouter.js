import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Title from "./pages/Title.js";
import Menu from "../src/components/Menu";
// import ProminentAppBar from "./components/Menu/index2";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Profile from "./pages/scottProfile";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { withRouter } from 'react-router-dom';
import queryString from 'query-string'
import axios from "axios"
import Footer from "./components/Navbar";
const MainRouter = withRouter(({ history }) => {
  const [currUser, setCurrUser] = useState({
    id: '',
    name: '',
    email: '',
    intro: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    lat: 0,
    lng: 0,
    needs: [],
    offers: [],
    createDate: '',
    rate: 0,
    ratingQuantity: 0
  });

  useEffect(() => {
    if (history.location.pathname.includes("/user") || history.location.pathname.includes("/barter") || history.location.pathname.includes("/profile")) {
      console.log(queryString.parse(history.location.search));
      const user_id = queryString.parse(history.location.search).id;
      axios.get(`../api/users/${user_id}`)
        .then(userInfo => {
          console.log(userInfo.data);
          setCurrUser({
            ...currUser,
            id: userInfo.data._id,
            name: userInfo.data.name,
            email: userInfo.data.email,
            createDate: userInfo.data.createAt,
            intro: userInfo.data.intro,
            street: userInfo.data.street,
            city: userInfo.data.city,
            state: userInfo.data.state,
            zip: userInfo.data.zip,
            lat: userInfo.data.lat,
            lng: userInfo.data.lng,
            needs: userInfo.data.needs,
            offers: userInfo.data.offers,
            rate: userInfo.data.rate,
            ratingQuantity: userInfo.data.ratingQuantity
          })
        })
    }
  }, [history.location])


  return (
    <div>
      <Menu currUser={currUser} setCurrUser={setCurrUser} />
      {/* <ProminentAppBar /> */}
      <div>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/" component={Title} />
          <Route path="/user" component={() => <Home currUser={currUser} setCurrUser={setCurrUser} />} />
          <Route path="/barter" component={() => <Chat currUser={currUser} setCurrUser={setCurrUser} />} />
          <Route path="/profile" component={() => <Profile currUser={currUser} setCurrUser={setCurrUser} />} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
        </Switch>
      </div>
      {history.location.pathname.includes("/user") || history.location.pathname.includes("/barter") || history.location.pathname.includes("/profile") ? (<Footer currUser={currUser} setCurrUser={setCurrUser}/>) : (null)}
    </div>
  )

})

export default MainRouter
