import React, { useEffect, useState } from 'react';
import $ from "jquery";
import socketIOClient from "socket.io-client";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ListIcon from "@material-ui/icons/List";
import IconButton from "@material-ui/core/IconButton";
import Modal from "../Modal";
import Popover from '@material-ui/core/Popover';
import Alert from '../Alert';
import "./chat-style.css";

const ChatWindow = ({ chatRoom, currUser, toggleDrawer, state, sideList, modalState, modalStyle, handleClose }) => {
    const socket = socketIOClient();
    const [imagePath, setImagePath] = useState("");
    const [imagedata, setImageData] = useState({
        success: "",
        error: ""
    });

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

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

        // message

        // $(`#${chatRoom.id}${currUser.id}`).keydown(function (e) {
        //     if (e.which === 13 && $(this).val()) {
        //         e.preventDefault();
        //         let msg = $(this).val();
        //         $(this).val('');
        //         console.log(imagePath);
        //         let hash = currUser.name + chatRoom.id + currUser.id;
        //         console.log(hash);
        //         console.log(chatRoom.id);
        //         socket.send(msg, chatRoom.id, currUser.id, currUser.name, hash, imagePath);
        //     }
        // });


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
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg" />
                    </div>
                </div>`
            } else {
                message = `
                <div class="d-flex justify-content-start mb-4">
                    <div class="img_cont_msg">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg" />
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
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg" />
                    </div>
                </div>
                `;
                } else {
                    message = `
                    <div class="d-flex justify-content-start mb-4">
                        <div class="img_cont_msg">
                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg" />
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



    return (
        <div style={{ height: "85vh", paddingBottom:"10px", paddingTop:"10px"}}>
            <div className="card" style={{ minHeight: "100%" }}>
                <div className="card-header msg_head">
                    <div className="d-flex bd-highlight">
                        <div className="img_cont">
                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" />
                            <span className="online_icon"></span>
                        </div>
                        <div className="user_info">
                            <span>Chat with {chatRoom.other.name}</span>
                        </div>
                    </div>
                    <span id="action_menu_btn">
                        <IconButton onClick={toggleDrawer("left", true)}>
                            <ListIcon />
                        </IconButton>
                    </span>
                </div>
                <div className="card-body msg_card_body" id="msglog">
                </div>
                <div className="card-footer">
                    <div className="input-group">
                        <div className="input-group-append">
                            <span className="input-group-text attach_btn" aria-describedby={id} onClick={"handleClick"}><i className="fas fa-paperclip"></i></span>
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
                                <form id="imageSubmit" action="/upload" method="POST" encType="multipart/form-data" onSubmit={handleSubmitImage}>
                                    <div className="form-group">
                                        <label htmlFor="pic">Upload Profile Image:</label>
                                        <input type="file" className="form-control-file" name="userImage" id="upload" onChange={clearAlert}></input>
                                    </div>
                                    <button className="btn btn-success" type="submit">Upload(Upload Before Submit)</button>
                                    <Alert type="danger" style={{ display: imagedata.error ? 'block' : 'none', marginBottom: 10 }}>
                                        {imagedata.error}
                                    </Alert>
                                    <Alert type="success" style={{ display: imagedata.success ? 'block' : 'none', marginBottom: 10 }}>
                                        {imagedata.success}
                                    </Alert>
                                </form>
                            </Popover>
                        </div>
                        <textarea name="" className="form-control type_msg" placeholder="Type your message..." id={chatRoom.id + currUser.id} onKeyDown={handSendEnter}></textarea>
                        <div className="input-group-append" onClick={handSend}>
                            <span className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
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
            <Modal open={modalState.open} handleClose={handleClose} modalStyle={modalStyle} reviewer={currUser.id} reviewee={modalState.reviewee} />
        </div>

    )
}


export default ChatWindow;



{/* <div>
            <h3>chatRoom#: {chatRoom.id}</h3>
            <div class="container-fluid justify-content-center">
                <div class="chatBox col" id="msglog">
                </div>
                <textarea style={classes.chatBox} name="message" className="col p-1" id={chatRoom.id + currUser.id} placeholder="Enter chat content here"></textarea>
                <form id="imageSubmit" action="/upload" method="POST" encType="multipart/form-data" onSubmit={handleSubmitImage}>
                    <div className="form-group">
                        <label htmlFor="pic">Upload Profile Image:</label>
                        <input type="file" className="form-control-file" name="userImage" id="upload" onChange={clearAlert}></input>
                    </div>
                    <button className="btn btn-success" type="submit">Upload(Upload Before Submit)</button>
                    <Alert type="danger" style={{ display: imagedata.error ? 'block' : 'none', marginBottom: 10 }}>
                        {imagedata.error}
                    </Alert>
                    <Alert type="success" style={{ display: imagedata.success ? 'block' : 'none', marginBottom: 10 }}>
                        {imagedata.success}
                    </Alert>
                </form>
                <div><button onClick={handSend}>Submit</button></div>
            </div>
        </div> */}