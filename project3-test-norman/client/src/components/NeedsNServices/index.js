import React, { useState } from 'react'
import { createMuiTheme } from 'material-ui/styles'
// import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import API from "../../utils/API-User"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const NSList = ({ category, list, currUser, setCurrUser }) => {
    const theme = createMuiTheme();
    const classes = {
        root: {
            flexGrow: 1,
            width: "100%",
            margin: 'auto'
        },
        root1: {
            width: "100%",
            display: "inline-block",
            textAlign: "center",
            marginTop:"15px"
        }
    };

    const [state, setState] = useState({
        list: list,
        newItem: ""
    });

    const handleChange = e => {
        console.log(e.target.value);
        setState({ ...state, newItem: e.target.value });
    }

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

    const handleSubmit = () => {
        let currList = state.list;
        currList.push(state.newItem);
        let obj = {};
        obj[category] = currList;
        console.log(currUser);
        API.updateUsers(currUser.id, obj)
            .then(() => {
                console.log("add!!!");
                setState({ ...state, newItem: "", list: currList });
            })

    }

    return (
        <div style={classes.root}>
            <List>
                {list.map((item, i) => (
                    <ListItem>
                        <ListItemText
                            primary={item}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={(i) => handleDelete(i)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <form style={classes.root1} noValidate autoComplete="off">
                <TextField id="standard-basic" label={category} value={state.newItem} onChange={handleChange} style={{ marginRight: "10px" }} />
                <Button variant="contained" color="primary" onClick={handleSubmit} style={{ padding: "10px" }}>Add</Button>
            </form>
        </div>
    )
}


export default NSList;
