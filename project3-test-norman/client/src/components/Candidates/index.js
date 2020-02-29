import React, { useState } from 'react'
import { createMuiTheme } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TelegramIcon from '@material-ui/icons/Telegram';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import API from "../../utils/API-Barter";
import { withRouter } from 'react-router-dom';


const Candidates = withRouter(({ history, category, candidates, searched, currUser, setCurrUser }) => {
    const theme = createMuiTheme();
    const classes = {
        root: {
            flexGrow: 1,
            width: "50%",
            margin:'auto'
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing.unit,
        },
    };

    const handleConnect = (user1Id, user2Id) => {
        API.findAll()
        .then(data=>{
            let currList = data.data.filter(chat => {
                return ((chat.user1 === user1Id && chat.user2 === user2Id) || ((chat.user1 === user2Id && chat.user2 === user1Id)))
            });
            if (!currList){
                API.create({user1:user1Id,user2:user2Id})
                .then(()=>{
                    history.push(`/barter/?id=${currUser.id}`);
                })
            }else{
                history.push(`/barter/?id=${currUser.id}`);
            }
        })
    }

    return (
        <div style={classes.root}>
            <Grid item xs={12} md={12}>
                {searched ? (<Typography variant="h6" style={classes.title}>
                    Result for {category}
                </Typography>):(<Typography variant="h6" style={classes.title}>
                    All Result for {category}
                </Typography>)}
                
                <div style={classes.demo}>
                    <List>
                        {candidates.map((user, i) => (
                            <ListItem key={i}>
                                <ListItemText
                                    primary={user.name}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="connect" onClick={()=>handleConnect(user._id, currUser.id)}>
                                        <TelegramIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="profile">
                                        <AccountCircleIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Grid>
        </div>
    )
})


export default Candidates;
