import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import API from "../../utils/API-User";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { STATES } from 'mongoose';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Modal from "../Modal";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));



function getModalStyle() {
    const top = 50 ;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const ChatList = ({ chatList, state, setState, currUser, setCurrUser }) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    // const [open, setOpen] = useState(false);
    const [modalState, setModalState] = useState({
        open:false,
        reviewee:""
    });
    const handleOpen = (reviewee) => {
        setModalState({
            open: true,
            reviewee: reviewee
        });
    };

    const handleClose = () => {
        setModalState({
            open:false,
            reviewee:""
        });
    };

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="chatlist">
                {chatList.map(tile => (
                    <ListItem button onClick={() => setState({ ...state, currChat: tile })}>
                        <ListItemText primary={tile.other.name} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="review" onClick={()=>handleOpen(tile.other.id)}>
                                <RateReviewIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Modal open={modalState.open} handleClose={handleClose} modalStyle={modalStyle} reviewer={currUser.id} reviewee={modalState.reviewee}/> 
        </div>
    );
}

export default ChatList;
