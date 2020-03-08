import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import API from "../utils/API-Barter";
import axios from 'axios';
import ChatWindow from "../components/ChatWindow";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import RateReviewIcon from '@material-ui/icons/RateReview';
import $ from "jquery";
import Modal from "../components/Modal";



const Chat = withRouter(({ history, currUser, setCurrUser }) => {

    const [state, setState] = useState({
        chatList: [],
        currChat: {},
        left: false,
    })

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
                self: { id: selfId, name: currUser.name,image:currUser.image},//add image here later
                other: { id: otherId }
            };
            axios.get(`../api/users/${otherId}`)
                .then(data1 => {
                    console.log(data1.data);
                    tempChatObj.other.name = data1.data.name;
                    tempChatObj.other.image = data1.data.image; //add image here later
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
        let temp = [];
        localStorage.setItem("socketDup", JSON.stringify(temp));
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

    //modal handler
    const [modalState, setModalState] = useState({
        open: false,
        reviewee: ""
    });
    const handleOpen = reviewee => {
        setModalState({
            open: true,
            reviewee: reviewee
        });
    };

    const handleClose = () => {
        setModalState({
            open: false,
            reviewee: ""
        });
    };

    //sidedrwaer handler
    const toggleDrawer = (side, open) => event => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        console.log(side);

        setState({ ...state, [side]: open });
    };

    const handleOpenChatWindow = tile => {
        console.log(tile);
        setState({ ...state, currChat: tile, left: false })
    };

    const handleDeleteChat = id => {
        console.log(id);
        console.log(state.chatList);
        let newChatList = state.chatList.filter(chat=>chat.id !== id);
        console.log(newChatList);
        API.remove(id)
        .then(()=>{
            setState({...state,chatList:newChatList});
        })
    }

    const sideList1 = side => (
            <div className="card contacts_card" style={{maxHeight:'80vh',marginTop:'70px',marginBottom:'0px',marginLeft:'15px',marginRight:'15px'}}>
                <div className="card-body contacts_body">
                    <ul className="contacts">
                        {state.chatList.map((tile, i) => (
                            <li 
                            className="active"
                            key={i} 
                            onClick={() => handleOpenChatWindow(tile)}
                            >
                                    <img 
                                    alt="titleImage"
                                    src={'/uploads/'+tile.other.image} className="rounded-circle user_img" 
                                    />
                                    <div className="user_info"
                                    >
                                    {tile.other.name}
                                    </div>
                            
                                    <IconButton 
                                    className="review_button"
                                    edge="end" aria-label="review" 
                                    style={{ padding: "0px", marginRight: "8px" }} onClick={() => 
                                        handleOpen(tile.other.id)
                                    }
                                    >
                                        <RateReviewIcon />
                                    </IconButton>
                                    <IconButton 
                                    className="delete_button"
                                    edge="end" aria-label="delete" 
                                    style={{ padding: "0px" }} 
                                    onClick={(e)=>{
                                        handleDeleteChat(tile.id)
                                        e.stopPropagation();
                                    }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
    );
    const sideList = side => (

            <div className="contacts_body">
                <ui className="contacts">
                    {state.chatList.map((tile) => (
                        <li 
                        className="active" 
                        onClick={() => handleOpenChatWindow(tile)}
                        >
                                    <img 
                                    alt="titleImage"
                                    src={'/uploads/'+tile.other.image} className="rounded-circle user_img" 
                                    />
                                    <span className="user_info"
                                    >
                                    {tile.other.name}
                                    </span>
                            
                                    <IconButton 
                                    className="review_button"
                                    edge="end" aria-label="review" 
                                    style={{ padding: "0px", marginRight: "8px" }} onClick={() => 
                                        handleOpen(tile.other.id)
                                    }
                                    >
                                        <RateReviewIcon />
                                    </IconButton>
                                    <IconButton 
                                    className="delete_button"
                                    edge="end" aria-label="delete" 
                                    style={{ padding: "0px" }} 
                                    onClick={(e)=>{
                                        handleDeleteChat(tile.id)
                                        e.stopPropagation();
                                    }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                            
                        </li>
                    ))}
                </ui>
            </div>

);

    console.log(state.currChat);
    if (!$.isEmptyObject(state.currChat)) {
        return (
            <ChatWindow 
            chatRoom={state.currChat} 
            currUser={currUser} 
            toggleDrawer={toggleDrawer} 
            state={state} 
            sideList={sideList} 
            modalState={modalState} 
            handleClose={handleClose} 
            // modalStyle={modalStyle}

            />
        );
    } else {
        return (
            <div 
            style={{ height: "85vh", paddingBottom:"10px", paddingTop:"10px" }}>
                {sideList1("left")}
                <Modal 
                open={modalState.open} 
                handleClose={handleClose} 
                // modalStyle={modalStyle} 
                reviewer={currUser.id} 
                reviewee={modalState.reviewee} 
                />
            </div>
        );
    }
});

export default Chat;