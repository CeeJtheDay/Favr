import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import API from "../../utils/API-User";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
// import { STATES } from 'mongoose';
import "./style.css";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const ChatList = ({ chatList, state, setState, currUser, setCurrUser }) => {
    const classes = useStyles();
    console.log(chatList);

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="chatlist">
                {chatList.map(tile => (
                    <ListItem button onClick={()=>setState({...state, currChat:tile})}>
                        <ListItemText primary={tile.other.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default ChatList;
