import React from 'react'
import Grid from 'material-ui/Grid'
import Search from '../components/Search';
// import axios from "axios";
import { withRouter } from 'react-router-dom';
// import queryString from 'query-string'
import NSList from "../components/NeedsNServices";

const Home = withRouter(({ history, currUser, setCurrUser }) => {
    // const classes = {
    //     root: {
    //         flexGrow: 1,
    //         margin: 30,
    //     }
    // };


    return (
        // <div className={classes.root}>
        //     <Grid container spacing={24}>
        //         <Grid item xs={12} sm={12}>
        //             <Search category="need" currUser={currUser} setCurrUser={setCurrUser} />
        //         </Grid>
        //         <Grid item xs={12} sm={12}>
        //             <Search category="service" currUser={currUser} setCurrUser={setCurrUser} />
        //         </Grid>
        //     </Grid>
        //     <Grid container spacing={24}>
        //         <Grid item xs={6} sm={6}>
        //             <NSList category="needs" list={currUser.needs} currUser={currUser} setCurrUser={setCurrUser} />

        //         </Grid>
        //         <Grid item xs={6} sm={6}>
        //             <NSList category="offers" list={currUser.offers} currUser={currUser} setCurrUser={setCurrUser} />
        //         </Grid>
        //     </Grid>
        // </div>
        <div>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                    <Search category="need" currUser={currUser} setCurrUser={setCurrUser} />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Search category="service" currUser={currUser} setCurrUser={setCurrUser} />
                </Grid>
            </Grid>
            <Grid container spacing={24}>
                <Grid item xs={6} sm={6}>
                    <NSList category="needs" list={currUser.needs} currUser={currUser} setCurrUser={setCurrUser} />

                </Grid>
                <Grid item xs={6} sm={6}>
                    <NSList category="offers" list={currUser.offers} currUser={currUser} setCurrUser={setCurrUser} />
                </Grid>
            </Grid>
        </div>
    )


});

export default Home;