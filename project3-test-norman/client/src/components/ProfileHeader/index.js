import React from 'react'
import Box from '@material-ui/core/Box';
import ProfilePic from '../ProfilePic/index'
import ProfileText from "../ProfileText/index"
// import Typography from 'material-ui/Typography'

const ProfileHeader = ({ currUser, setCurrUser }) => {


    return (
        <div style={{ width: '100%' }}>
            <Box display="flex" p={1} bgcolor="background.paper">
                <Box p={1} flexGrow={1} bgcolor="grey.300">
                    <ProfilePic />
                </Box>
                <Box p={1} bgcolor="grey.300">
                    <ProfileText currUser={currUser} setCurrUser={setCurrUser}/>
                    {/* <Typography>Scott</Typography> */}
                </Box>
            </Box>
        </div>
    );

}

export default ProfileHeader;

