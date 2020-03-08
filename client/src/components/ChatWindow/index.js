import React, { useEffect, useState } from 'react';
import $ from "jquery";
import socketIOClient from "socket.io-client";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ListIcon from "@material-ui/icons/List";
import IconButton from "@material-ui/core/IconButton";
import Modal from "../Modal";
import Popover from '@material-ui/core/Popover';
import Alert from '../Alert';
import { withRouter } from 'react-router-dom';
// import "./style.css";

const ChatWindow = withRouter(({history, chatRoom, currUser, toggleDrawer, state, sideList, modalState, modalStyle, handleClose }) => {

    const classes = {
        container: {
            height: "84vh", 
            paddingBottom:"10px", 
            paddingTop:"10px",
            margin: "70px 0 0 0"
        },
        card: {
            minHeight: "100%",
            backgroundColor: "#8693AB",
            borderRadius: "20px",
            border: "groove 1px rgb(43,41,44, 0.3)"
        },
        text: {
            color: "white",
            textShadow: "2px 2px 4px #000000"
        },
        imgCont: {
            position: "relative",
            height: "50px",
            width: "50px"
        },
        userInfo: {
            // marginTop: "0px",
            marginBottom: "15px",
            marginLeft: "15px",
            width:'300px',
            paddingRight:"0px",
            marginTop:'20px'
        },
        actionMenuButton: {
            position: "absolute",
            right: "5px",
            top: "10px",
            color: "white",
            cursor: "pointer",
            fontSize: "40px"
        },
        msgCardBody: {
            overflowY: "auto"
        },
        cardFooter: {
            borderRadius: "0 0 15px 15px !important",
            borderTop: "0 !important"
        },
        attachBtn: {
            borderRadius: "15px 0 0 15px !important",
            backgroundColor: "rgba(0,0,0,0.3 !important",
            border: "0 !important",
            color: "white !important",
            cursor: "pointer"
        },
        sendBtn: {
            borderRadius: "0 15px 15px 0 !important",
            backgroundColor: "rgba(0,0,0,0.3)!important",
            border: "0 !important",
            color: "white !important",
            cursor: "pointer",
        }
    }
    const socket = socketIOClient();
    const [imagePath, setImagePath] = useState("");
    const [imagedata, setImageData] = useState({
        success: "",
        error: ""
    });

    const [anchorEl, setAnchorEl] = useState(null);

    // const handleClick = event => {
    //     setAnchorEl(event.currentTarget);
    // };

    const handleClosePop = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    function loadSocket() {
        
        // join
        socket.on('connect', function () {
            socket.emit('join', currUser.id, chatRoom.id, currUser.name);
        })

    }

    //socket listener

    socket.once('history', function (history) {
        for (var i = 0; i < history.length; i++) {
            let message;
            if (history[i].id === currUser.id) {
                message = `
                <div class="d-flex justify-content-end mb-4">
                    <div class="msg_cotainer_send">
                        ${history[i].message}
                        <span class="msg_time_send">${history[i].time}</span>
                    </div>
                    <div class="img_cont_msg">
                        <img src='/uploads/${chatRoom.self.image}' class="rounded-circle user_img_msg" />
                    </div>
                </div>`
            } else {
                message = `
                <div class="d-flex justify-content-start mb-4">
                    <div class="img_cont_msg">
                        <img src='/uploads/${chatRoom.other.image}' class="rounded-circle user_img_msg" />
                    </div>
                    <div class="msg_cotainer">
                        ${history[i].message}
                        <span class="msg_time">${history[i].time}</span>
                    </div>
                </div>
                `
            }
            $('#msglog').append(message);
            $('#msglog').scrollTop($('#msglog')[0].scrollHeight);
        }
    })

    // listen
    socket.once('sys', function (sysMsg) {
        var message = '<div class="sysMsg mb-4" style="text-align:center;background:lightgray">' + sysMsg + '</div>';
        $('#msglog').append(message);

    });

    // send
    socket.on('msg', function (userName, msg, msgObj, time) {
        let acknowledged = JSON.parse(localStorage.getItem("socketDup"));
        console.log(acknowledged);
        console.log(acknowledged.indexOf(msg.event_id));
        if (!~acknowledged.indexOf(msg.event_id)) {

            // add to array of acknowledged events
            acknowledged.unshift(msg.event_id);

            // prevent array from growing to large
            if (acknowledged.length > 20) {
                acknowledged.length = 20;
            }

            localStorage.setItem("socketDup", JSON.stringify(acknowledged));

            let message;
            console.log(!msg.image);
            if (!msg.image) {
                if (msgObj.id === currUser.id) {
                    message = `
                <div class="d-flex justify-content-end mb-4">
                    <div class="msg_cotainer_send">
                            ${msg.msg}
                        <span class="msg_time_send">${time}</span>
                    </div>
                    <div class="img_cont_msg">
                        <img src='/uploads/${chatRoom.self.image}' class="rounded-circle user_img_msg" />
                    </div>
                </div>
                `;
                } else {
                    message = `
                    <div class="d-flex justify-content-start mb-4">
                        <div class="img_cont_msg">
                            <img src='/uploads/${chatRoom.other.image}' class="rounded-circle user_img_msg" />
                        </div>
                        <div class="msg_cotainer">
                            ${msg.msg}
                            <span class="msg_time">${time}</span>
                        </div>
                    </div>
                    `;
                }
            } else {
                if (msgObj.id === currUser.id) {
                    message = `
                    <div className="d-flex justify-content-end mb-4">
                        <div className="msg_cotainer_send">
                            <img src='/uploads/${msg.image}' height='100' width='100'><br/>
                                ${msg.msg}
                            <span className="msg_time_send">${time}</span>
                        </div>
                        <div className="img_cont_msg">
                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                        </div>
                    </div>
                    `
                } else {
                    message = `
                    <div class="d-flex justify-content-start mb-4">
                        <div class="img_cont_msg">
                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg" />
                        </div>
                        <div class="msg_cotainer">
                            <img src='/uploads/${msg.image}' height='100' width='100'><br/>
                            ${msg.msg}
                            <span class="msg_time">${time}</span>
                        </div>
                    </div>
                    `;
                }
            }
            $('#msglog').append(message);
            $('#msglog').scrollTop($('#msglog')[0].scrollHeight);
        }
    });



    useEffect(() => {
        $('#msglog').empty();
        console.log("here");
        loadSocket();

    }, [chatRoom])


    const handSend = e => {
        e.preventDefault();
        let msg = $(`#${chatRoom.id}${currUser.id}`).val().trim();
        $(`#${chatRoom.id}${currUser.id}`).val('');
        console.log(imagePath);
        let hash = currUser.name + chatRoom.id + currUser.id;
        console.log(hash);
        socket.send(msg, chatRoom.id, currUser.id, currUser.name, hash, imagePath);
    }

    const handSendEnter = e => {
        if (e && e.type === "keydown" && e.keyCode === 13) {
            e.preventDefault();
            let msg = $(`#${chatRoom.id}${currUser.id}`).val().trim();
            $(`#${chatRoom.id}${currUser.id}`).val('');
            console.log(imagePath);
            let hash = currUser.name + chatRoom.id + currUser.id;
            console.log(hash);
            socket.send(msg, chatRoom.id, currUser.id, currUser.name, hash, imagePath);
        }
    }

    const handleSubmitImage = event => {
        event.preventDefault();
        console.log(new FormData(event.target));
        fetch(event.target.action, {
            method: 'POST',
            encType: "multipart/form-data",
            body: new FormData(event.target) // event.target is the form
        }).then((resp) => {
            return resp.json(); // or resp.text() or whatever the server sends
        }).then((body) => {
            console.log(body);
            if (body.err) {
                setImageData({ success: "", error: body.err });
            } else {
                console.log(body.name);
                setImagePath(body.name);
                console.log(imagePath);
                setImageData({ success: body.message, error: "" });
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const clearAlert = event => {
        setImageData({ success: "", error: "" });
    };

    const handlePage = id => {
        history.push(`/other/?id=${id}`);
    } 



    return (
        <div style={classes.container}>
            <div style={classes.card}>
                <div 
                className="card-header msg_head"
                >
                    <div 
                    className="d-flex bd-highlight"
                    >
                        <div 
                        style={classes.imgCont} onClick={()=>handlePage(chatRoom.other.id)}
                        >
                            <img 
                            src={'/uploads/'+chatRoom.other.image} 
                            alt="chatroom"
                            className="rounded-circle user_img" />
                            <span className="online_icon"></span>
                        </div>
                        <div 
                        style={classes.userInfo} >
                            <span
                            style={classes.text}
                            >
                            Chat w/ {chatRoom.other.name}</span>
                        </div>
                    </div>
                    <span 
                    id="action_menu_btn"
                    style={classes.actionMenuButton}>
                        <IconButton onClick={toggleDrawer("left", true)}>
                            <ListIcon />
                        </IconButton>
                    </span>
                </div>
                <div 
                className="card-body msg_card_body"
                style={classes.msgCardBody}
                id="msglog"
                >
                </div>
                <div 
                className="card-footer"
                style={classes.cardFooter}
                >
                    <div className="input-group">
                        <div className="input-group-append">
                            <span className="input-group-text attach_btn" 
                            style={classes.attachBtn}
                            aria-describedby={id} onClick={"handleClick"}>
                                <i 
                                className="fas fa-paperclip"
                                >

                                </i>
                            </span>
                            <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClosePop}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            >
                                <form id="imageSubmit" action="/upload" method="POST" encType="multipart/form-data" 
                                onSubmit={handleSubmitImage}
                                >
                                    <div className="form-group"
                                    >
                                        <label htmlFor="pic">
                                        Upload Profile Image:
                                        </label>
                                        <input type="file" className="form-control-file" name="userImage" id="upload" onChange={clearAlert}></input>
                                    </div>
                                    <button className="btn btn-success" type="submit">
                                    Upload(Upload Before Submit)
                                    </button>
                                    <Alert type="danger" style={{ display: imagedata.error ? 'block' : 'none', marginBottom: 10 }}>
                                        {imagedata.error}
                                    </Alert>
                                    <Alert type="success" style={{ display: imagedata.success ? 'block' : 'none', marginBottom: 10 }}>
                                        {imagedata.success}
                                    </Alert>
                                </form>
                            </Popover>
                        </div>
                        <textarea 
                        name="" 
                        className="form-control type_msg" 
                        placeholder="Type your message..." 
                        id={chatRoom.id + currUser.id} 
                        onKeyDown={handSendEnter}>
                        </textarea>
                        <div className="input-group-append" 
                        onClick={handSend}>
                            <span className="input-group-text send_btn"
                            style={classes.sendBtn}
                            >
                                <i className="fas fa-location-arrow"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <SwipeableDrawer
                open={state.left}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
            >
                {sideList("left")}
            </SwipeableDrawer>
            <Modal 
            open={modalState.open} 
            handleClose={handleClose} 
            // modalStyle={modalStyle} 
            reviewer={currUser.id} 
            reviewee={modalState.reviewee} />
        </div>

    )
})


export default ChatWindow;