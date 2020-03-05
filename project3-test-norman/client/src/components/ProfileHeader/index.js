import React from 'react'
import Box from '@material-ui/core/Box';
import ProfilePic from '../ProfilePic/index'
import ProfileText from "../ProfileText/index"

const ProfileHeader = ({ currUser, setCurrUser }) => {


    return (
        <div style={{ width: '100%' }}>
            <Box display="flex" p={1} bgcolor="background.paper">
                <Box flexGrow={1} bgcolor="grey.300" style={{paddingTop:'20px'}}>
                    <ProfilePic />
                </Box>
                <Box flexGrow={4} bgcolor="grey.300">
                    <ProfileText currUser={currUser} setCurrUser={setCurrUser}/>
                </Box>
            </Box>
        </div>
    );

}

export default ProfileHeader;

