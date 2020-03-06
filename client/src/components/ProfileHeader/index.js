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
        },
        grid1: {
            borderRadius: "20px 0 0 0"
        },
        profilePic: {
            borderRadius: "20px 0 0 0",
            margin: "20px"
        },
        grid2: {
            borderRadius: "0 20px 0 0"
        },
        profileInfo: {
            borderRadius: "0 20px 0 0"

        },
        profileText: {
            color: "white"

        }
    }


    return (
        // <div style={classes.container}>
            <React.Fragment>
            <Grid
            style={classes.grid1} 
            item sm={3}>
                
                    <ProfilePic 
                    style={classes.profilePic}
                    currUser={currUser}/>
                
            </Grid>
            <Grid 
            style={classes.grid2}
            item sm={9}>
                <Box 
                style={classes.profileInfo}
                flexGrow={4} 
                bgcolor="grey.300">
                    <ProfileText 
                    style={classes.profileText}
                    currUser={currUser} 
                    setCurrUser={setCurrUser}

                    />
                </Box>
            </Grid>
            </React.Fragment>
        // </div>
    );

}

export default ProfileHeader;

