import React from 'react'
import Grid from 'material-ui/Grid'
import Search from '../components/Search';
import { withRouter } from 'react-router-dom';

const Home = withRouter(({ history, currUser, setCurrUser }) => {

    const classes = {
        container: {
          maxWidth: 600,
          textAlign: 'center',
          height: "80vh",
          margin: "80px auto",
          paddingRight: "auto",
          paddingLeft: "auto",
          backgroundColor: "#8693AB",
          borderRadius: "20px",
          border: "groove 3px rgb(43,41,44, 0.3)",
          overflow: "auto"
        }

      };

    return (

            <Grid style={classes.container} container spacing={24}>
                <Grid item xs={12} sm={12}>
                    <Search category="need" currUser={currUser} setCurrUser={setCurrUser} />
                </Grid>
            </Grid>
    )


});

export default Home;