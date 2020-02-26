import React, { useState, useEffect } from 'react';
import $ from "jquery";
import Script from 'react-load-script';
import socketIOClient from "socket.io-client";


const ChatWindow = ({ chatRoom, currUser }) => {
    function loadSocket(socket) {
        //var socket = io();
        // join
        socket.on('connect', function () {
            console.log(chatRoom.id);
            socket.emit('join', currUser.id, chatRoom.id, currUser.name);
        });
    }

    useEffect(() => {
        $('#msglog').empty();
        //socket.emit("disconnect", chatRoom.id);
        loadSocket(socket);

    }, [chatRoom])
    
    const socket = socketIOClient("127.0.0.1:3001");
    // send
    socket.on('msg', function (userName, msg, time) {
        var message = '' +
            '<div class="message">' +
            '  <span class="user bold">' + userName + ' </span>' + '<span class="sysMsg">' + time + '</span>' + '<br>' +
            '<span class="msg">' + msg + '</span>' +
            '</div>';
        $('#msglog').append(message);
        $('#msglog').scrollTop($('#msglog')[0].scrollHeight);
    });

    //load previous history

    socket.on('history', function (history) {
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
    socket.on('sys', function (sysMsg) {
        var message = '<div class="sysMsg">' + sysMsg + '</div>';
        $('#msglog').append(message);

    });

    // // message
    // $(`#${chatRoom.id}${currUser.id}`).keydown(function (e) {
    //     if (e.which === 13) {
    //         e.preventDefault();
    //         let msg = $(this).val();
    //         socket.send(msg, chatRoom.id, currUser.id, currUser.name);
    //     }
    // });

    const handSend = e => {
        e.preventDefault();
        let msg = $(`#${chatRoom.id}${currUser.id}`).val().trim();
        $(`#${chatRoom.id}${currUser.id}`).empty();
        socket.send(msg, chatRoom.id, currUser.id, currUser.name);
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