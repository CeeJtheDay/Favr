import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import API from "../utils/API-Barter";
import ChatList from "../components/ChatList";
import APIU from "../utils/API-User";
import axios from 'axios';
import ChatWindow from "../components/ChatWindow";
import $ from "jquery";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },

}));

const Chat = withRouter(({ history, currUser, setCurrUser }) => {
    const classes = useStyles();
    const [state, setState] = useState({
        chatList: [],
        currChat: {},
    })
    console.log(state.currChat);

    const handleName = (currList) => {
        let tempChatList = [];
        currList.map(async (chat, i) => {
            await ran(currList, chat, tempChatList);
        })
    }

    function ran(currList, chat, tempChatList) {
        return new Promise(resolve => {
            console.log(chat);
            let selfId = chat.user1 === currUser.id ? chat.user1 : chat.user2;
            let otherId = chat.user2 === currUser.id ? chat.user1 : chat.user2;
            let tempChatObj = {
                id: chat._id,
                self: { id: selfId, name: currUser.name },
                other: { id: otherId }
            };
            axios.get(`../api/users/${otherId}`)
                .then(data1 => {
                    console.log(data1.data);
                    tempChatObj.other.name = data1.data.name;
                    tempChatList.push(tempChatObj);
                    console.log(tempChatList);
                    if (tempChatList.length === currList.length) {
                        console.log(tempChatList);
                        setState({ ...state, chatList: tempChatList });
                    }
                })
        })
    }

    useEffect(() => {
        console.log(currUser);
        API.findAll()
            .then(data => {
                console.log(data.data);
                let currList = data.data.filter(chat => {
                    console.log(chat);
                    return (chat.user1 === currUser.id || chat.user2 === currUser.id)
                });
                console.log(currList);
                handleName(currList);
            })
    }, [])


    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <ChatList chatList={state.chatList} state={state} setState={setState} currUser={currUser} setCurrUser={setCurrUser} />
                </Grid>
                <Grid item xs={8}>
                    {!$.isEmptyObject(state.currChat) && (<ChatWindow chatRoom={state.currChat} currUser={currUser} />)}
                </Grid>
            </Grid>
        </div>
    );
});

export default Chat;