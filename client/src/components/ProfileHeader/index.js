import React from 'react'
import Box from '@material-ui/core/Box';
import ProfilePic from '../ProfilePic/index';
import ProfileText from "../ProfileText/index";
import Grid from '@material-ui/core/Grid';

const ProfileHeader = ({ currUser, setCurrUser }) => {

    const classes = {
        container: {
            flexGrow:1,
            width: "100%",
            backgroundColor: "rgb(43,41,44, 0.3)",
            borderRadius: "20px",
            boder: "groove 1px rgb(43,41,44, 0.3)",
            flexWrap:"nowrap"
        },
        grid1: {
            borderRadius: "20px 0 0 0"
        },

        grid2: {
            borderRadius: "0 20px 0 0"
        },
        profileInfo: {
            borderRadius: "0 20px 0 0"

        },
    }


    return (
        // <div style={classes.container}>
        <Grid container style={classes.container} spacing={2}>
            <Grid
                style={classes.grid1}
                item xs={3}>

                <ProfilePic
                    currUser={currUser}
                />

            </Grid>
            <Grid
                style={classes.grid2}
                item xs={9}>
                <Box
                    style={classes.profileInfo}
                    flexGrow={4}
                    bgcolor="grey.300">
                    <ProfileText
                        currUser={currUser}
                        setCurrUser={setCurrUser}
                    />
                </Box>
            </Grid>
        </Grid>
        // </div>
    );

}

export default ProfileHeader;

