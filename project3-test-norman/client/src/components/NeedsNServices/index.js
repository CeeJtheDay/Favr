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
            width: "50%",
            margin: 'auto'
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing.unit,
        },
        root1: {
              margin: theme.spacing.unit,
              width: 200,
        }
    };

    const [state, setState] = useState({
        list: list,
        newItem:""
    });

    const handleChange = e => {
        console.log(e.target.value);
        setState({...state, newItem:e.target.value});
    }

    const handleDelete = (i) => {
        console.log(i);
        let currList = state.list;
        currList.splice(i,1);
        let obj = {};
        obj[category]=currList;
        API.updateUsers(currUser.id, obj)
            .then(() => {
                console.log("delete!!!");
                setState({...state,list:currList});
            })
    }

    const handleSubmit = () => {
        let currList = state.list;
        currList.push(state.newItem);
        let obj = {};
        obj[category]=currList;
        console.log(currUser);
        API.updateUsers(currUser.id, obj)
            .then(() => {
                console.log("add!!!");
                setState({...state,newItem:"", list:currList});
            })

    }

    return (
        <div style={classes.root}>
            <Grid item xs={12} md={12}>
                <Typography variant="h6" style={classes.title}>
                    My {category}:
                </Typography>
                <div style={classes.demo}>
                    <List>
                        {list.map((item, i) => (
                            <ListItem>
                                <ListItemText
                                    primary={item}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={(i)=> handleDelete(i)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
                <form style={classes.root1} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label={category} variant="outlined" value={state.newItem} onChange={handleChange}/>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                </form>
            </Grid>
        </div>
    )
}


export default NSList;
