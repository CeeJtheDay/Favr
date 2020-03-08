import React, { useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import API from "../../utils/API-User"

const NSList = ({ category, list, currUser, setCurrUser }) => {
 
    const classes = {
        root: {
            flexGrow: 1,
            width: "100%",
            margin: 'auto'
        },
        delete: {
            color: "white",
            boxShadow: "2px 4px 2px rgb(43,41,44, 0.3)",
        },
        text: {
            textShadow: "2px 2px 4px #000000"
        }
    };

    const [state, setState] = useState({
        list: list,
        newItem: ""
    });

    const handleDelete = (i) => {
        console.log(i);
        let currList = state.list;
        currList.splice(i, 1);
        let obj = {};
        obj[category] = currList;
        API.updateUsers(currUser.id, obj)
            .then(() => {
                console.log("delete!!!");
                setState({ ...state, list: currList });
            })
    }


    return (
        <div style={classes.root}>
            <List>
                {list.map((item, i) => (
                    <ListItem>
                        <ListItemText
                            style={classes.text}
                            primary={item}
                        />
                        <ListItemSecondaryAction>
                            <IconButton 
                            style={classes.delete}
                            edge="end" 
                            aria-label="delete" 
                            onClick={(i) => handleDelete(i)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            
        </div>
    )
}


export default NSList;
