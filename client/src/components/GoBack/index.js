
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MessageIcon from '@material-ui/icons/Message';
import { Link, withRouter } from 'react-router-dom'
import { TableFooter } from 'material-ui';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: "rgb(86,86,86)",
        position: 'fixed',
        bottom: 0
    },
});





const Footer = withRouter(({ history, currUser, setCurrUser }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState();
    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Back" icon={<ArrowBackIcon />} onClick={()=>history.goBack()}/>
        </BottomNavigation>
    );
})

export default Footer