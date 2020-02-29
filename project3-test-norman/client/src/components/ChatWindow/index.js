import React, { useEffect } from 'react';
import $ from "jquery";
// import Script from 'react-load-script';
import socketIOClient from "socket.io-client";


const ChatWindow = ({ chatRoom, currUser }) => {
    const socket = socketIOClient();
    function loadSocket() {
        let acknowledged = [];
        // join
        socket.on('connect', function () {
            socket.emit('join', currUser.id, chatRoom.id, currUser.name);
        })
        socket.once('history', function (history) {
            console.log(history);
            for (var i = 0; i < history.length; i++) {
                var message = '' +
                    '<div class="message">' +
                    '  <span class="user">' + history[i].userName + ': </span>' +
                    '  <span class="msg">' + history[i].message + '</span>' +
                    '</div>' +
                    '<div class="sysMsg">' + history[i].time + '</div>';
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
            if (!~acknowledged.indexOf(msg.event_id)) {

                // add to array of acknowledged events
                acknowledged.unshift(msg.event_id);

                // prevent array from growing to large
                if (acknowledged.length > 20) {
                    acknowledged.length = 20;
                }
                var message = 
                    `<div class='message'> 
                    <span class='user bold'> ${userName}</span>
                    <span class='sysMsg'>${time}</span>
                    <br>
                    <span class='msg'>${msg.msg}</span>
                    </div>`;
                $('#msglog').append(message);
                $('#msglog').scrollTop($('#msglog')[0].scrollHeight);
            }
        });

        // message

        $(`#${chatRoom.id}${currUser.id}`).keydown(function (e) {
            if (e.which === 13) {
                e.preventDefault();
                let msg = $(this).val();
                $(this).val('');
                socket.send(msg, chatRoom.id, currUser.id, currUser.name, currUser.name+chatRoom.id+currUser.id);
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
        socket.send(msg, chatRoom.id, currUser.id, currUser.name, currUser.name+chatRoom.id+currUser.id);
    }


    return (
        <div>
            <h3>chatRoom#: {chatRoom.id}</h3>
            <div class="container-fluid justify-content-center">
                <div class="chatBox col" id="msglog">
                </div>
                <textarea name="message" class="col p-1" id={chatRoom.id + currUser.id} placeholder="Enter chat content here"></textarea>
                <div><button onClick={handSend}>Submit</button></div>
            </div>
        </div>
    )
}


export default ChatWindow;