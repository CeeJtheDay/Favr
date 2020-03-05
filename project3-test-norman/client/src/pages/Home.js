import React from 'react'
import Grid from 'material-ui/Grid'
import Search from '../components/Search';
// import { useTheme } from '@material-ui/core/styles';
// import axios from "axios";
import { withRouter } from 'react-router-dom';
// import queryString from 'query-string'
// import NSList from "../components/NeedsNServices";

const Home = withRouter(({ history, currUser, setCurrUser }) => {
    // const theme = useTheme();
    const classes = {
        container: {
          // maxWidth: 600,
          margin: 'auto',
          textAlign: 'center',
          // marginTop: "40px",
          // height: "100%",
          // bottom: 0,
          paddingBottom: "40px",
          paddingRight: "auto",
          paddingLeft: "auto",
          backgroundColor: "#8693AB",
          // borderRadius: "20px",
          border: "inset 1px white",
          overflow: "auto"
          // display: "flex"
        },
        error: {
          verticalAlign: 'middle'
        },
        title: {
          marginTop: "20px",
          color: "white",
          // backgroundColor: "#96CDFF",
          // border: "solid 1px #077699",
          // borderRadius: "15px",
          width: "auto",
          flexBox: "center",
          // backgroundImage: "linear-gradient(to right, #96CDFF 0%, #077699 51%, #96CDFF 100%)"
         
        },
        textField: {
          marginLeft: "20px",
          marginRight: "20px",
          width: 300,
          color: "secondary",
          border: "white",
        },
        submit: {
          margin: 'auto',
          marginBottom: "40px",
          backgroundImage: "linear-gradient(to right, #96CDFF 0%, #077699 51%, #96CDFF 100%)",
          border: "solid 1px #077699",
          borderRadius: "15px"
        }
      };
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
        // <div style={classes.container}>

            <Grid style={classes.container} container spacing={24}>
                <Grid item xs={12} sm={12}>
                    <Search category="need" currUser={currUser} setCurrUser={setCurrUser} />
                </Grid>
                {/* <Grid item xs={12} sm={12}>
                    <Search category="service" currUser={currUser} setCurrUser={setCurrUser} />
                </Grid> */}
            </Grid>
        // </div>
           
        
    )


});

export default Home;