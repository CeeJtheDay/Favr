import React from 'react'
import Box from '@material-ui/core/Box';
import ProfilePic from '../ProfilePic/index';
import ProfileText from "../ProfileText/index";
import Grid from '@material-ui/core/Grid';

const ProfileHeader = ({ currUser, setCurrUser }) => {

    const classes = {
        container: {
            width: "100%",
            backgroundColor: "rgb(43,41,44, 0.3)",
            borderRadius: "20px",
            boder: "groove 1px rgb(43,41,44, 0.3)",
        }
    }


    return (
        // <div style={classes.container}>
            <React.Fragment>
            <Grid item sm={3}>
                <Box flexGrow={1} bgcolor="grey.300">
                    <ProfilePic currUser={currUser}/>
                </Box>
            </Grid>
            <Grid item sm={9}>
                <Box flexGrow={4} bgcolor="grey.300">
                    <ProfileText currUser={currUser} setCurrUser={setCurrUser}/>
                </Box>
            </Grid>
            </React.Fragment>
        // </div>
    );

}

export default ProfileHeader;

