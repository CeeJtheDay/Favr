
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MessageIcon from '@material-ui/icons/Message';
import SyncAltIcon from '@material-ui/icons/SyncAlt';

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

export default function LabelBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction label="Home" value="recents" icon={<HomeIcon />} />
            <BottomNavigationAction label="User" value="favorites" icon={<AccountBoxIcon />} />
            <BottomNavigationAction label="Messages" value="nearby" icon={<MessageIcon />} />
            <BottomNavigationAction label="Trades" value="folder" icon={<SyncAltIcon />} />
        </BottomNavigation>
    );
}

