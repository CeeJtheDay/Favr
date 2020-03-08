
import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MessageIcon from '@material-ui/icons/Message';
import { withRouter } from 'react-router-dom'

const isPartActive = (history, path) => {
    if (history.location.pathname.includes(path))
        return { color: '#bef67a' }
}



const Footer = withRouter(({ history, currUser, setCurrUser }) => {

    const classes = {
        root: {
            width: '100%',
            backgroundColor: "rgb(86,86,86)",
            position: 'fixed',
            bottom: 0
        }
    }

    const [value, setValue] = React.useState();
    return (
        <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        showLabels
        style={classes.root}
        >
            <BottomNavigationAction 
            href={'/user/?id=' + currUser.id} 
            label="Dashborad" 
            icon={<HomeIcon />} 
            style={isPartActive(history, "/user")} 
            />
            <BottomNavigationAction 
            href={'/profile/?id=' + currUser.id} 
            label="Profile" 
            icon={<AccountBoxIcon />} 
            style={isPartActive(history, "/profile")} 
            />
            <BottomNavigationAction 
            href={'/barter/?id=' + currUser.id} 
            label="Messages" 
            icon={<MessageIcon />} 
            style={isPartActive(history, "/barter")} 
            />
        </BottomNavigation>
    );
})

export default Footer