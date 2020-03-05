import React, { useEffect, useState } from 'react';
import $ from "jquery";
// import Script from 'react-load-script';
import socketIOClient from "socket.io-client";
import Alert from "../Alert";
import "./style.css";

const ChatWindow = ({ chatRoom, currUser }) => {
    const classes= {
        container: {
            border: "inset 1px white",
            borderRadius: "20px",
            backgroundColor: "#8693AB",
            padding: "40px",
            color: "white",
            margin: "20px auto 20px auto"
        },
        chatBox: {
            maxWidth: 400,
        }
    }
    const socket = socketIOClient();
    const [imagePath, setImagePath] = useState("");
    const [imagedata, setImageData] = useState({
        success: "",
        error: ""
    });

    function loadSocket() {
        
        // join
        socket.on('connect', function () {
            socket.emit('join', currUser.id, chatRoom.id, currUser.name);
        })
        socket.once('history', function (history) {
            console.log(history);
            for (var i = 0; i < history.length; i++) {
                var message = 
                    `<div class="message">
                    <span class="user">${history[i].userName}: </span>
                    <span class="msg">${history[i].message}</span>
                    </div>
                    <div class="sysMsg">${history[i].time}</div>`;
                $('#msglog').append(message);
                $('#msglog').scrollTop($('#msglog')[0].scrollHeight);
            }
        })

        // listen
        socket.once('sys', function (sysMsg) {
            var message = '<div class="sysMsg">' + sysMsg + '</div>';
            $('#msglog').append(message);

        });

        // send
        socket.on('msg', function (userName, msg, time) {
            let acknowledged = JSON.parse(localStorage.getItem("socketDup"));

            if (!~acknowledged.indexOf(msg.event_id)) {

                // add to array of acknowledged events
                acknowledged.unshift(msg.event_id);

                // prevent array from growing to large
                if (acknowledged.length > 20) {
                    acknowledged.length = 20;
                }

                localStorage.setItem("socketDup", JSON.stringify(acknowledged));

                let message;
                if (!msg.image) {
                    message =
                        `<div class="message">
                        <span class="user bold">${userName}</span>
                        <span class="sysMsg">${time}</span>
                        <br/>
                        <span class="msg">${msg.msg}</span>
                        </div>`;
                } else {
                    message = `<div class='message'>
                    <span class='user bold'>${userName}</span>
                    <span class='sysMsg'>${time}</span>
                    <br/>
                    <img src='/uploads/${msg.image}' height='100' width='100'>
                    <br/>
                    <span class='msg'>${msg.msg}</span>
                    </div>`;
                }
                $('#msglog').append(message);
                $('#msglog').scrollTop($('#msglog')[0].scrollHeight);
            }
        });

        // message

        $(`#${chatRoom.id}${currUser.id}`).keydown(function (e) {
            if (e.which === 13 && $(this).val()) {
                e.preventDefault();
                let msg = $(this).val();
                $(this).val('');
                console.log(imagePath);
                let hash = currUser.name + chatRoom.id + currUser.id;
                console.log(hash);
                socket.send(msg, chatRoom.id, currUser.id, currUser.name, hash, imagePath);
            }
        });


    }

    useEffect(() => {
        $('#msglog').empty();
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
        <div style={classes.container} >
            {/* <h3>chatRoom#: {chatRoom.id}</h3> */}
            <div className="container-fluid justify-content-center">
                <div className="chatBox col" id="msglog">
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
        </div>
    )
}


export default ChatWindow;