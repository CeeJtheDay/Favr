import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import RateReviewIcon from '@material-ui/icons/RateReview';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from "../Modal";

// function getModalStyle() {
//     const top = 50 ;
//     const left = 50;

//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

const ChatList = ({ chatList, state, setState, currUser, setCurrUser }) => {

    const classes = {
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: "#8693AB",
            margin: "80px auto 50px auto"
        }
    }
    // const [modalStyle] = useState(getModalStyle);
    // const [modalState, setModalState] = useState({
    //     open:false,
    //     reviewee:""
    // });
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
        <div style={classes.root}>
            <List 
            component="nav" 
            aria-label="chatlist"
            >
                {chatList.map(tile => (
                    <ListItem 
                    button 
                    onClick={() => setState({ ...state, currChat: tile })}
                    >
                        <ListItemText 
                        primary={tile.other.name} 
                        />
                        <ListItemSecondaryAction>
                            <IconButton 
                            edge="end" 
                            aria-label="review" 
                            onClick={()=>handleOpen(tile.other.id)}
                            >
                                <RateReviewIcon />
                            </IconButton>
                            <IconButton 
                            edge="end" 
                            aria-label="delete"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Modal 
            open={modalState.open} 
            handleClose={handleClose} 
            // modalStyle={modalStyle} 
            reviewer={currUser.id} 
            reviewee={modalState.reviewee}/> 
        </div>
    );
}

export default ChatList;
