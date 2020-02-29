const express = require("express");
var cors = require("cors");

var IO = require("socket.io");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Socket section
var server = require('http').Server(app);

var socketIO = IO(server);
var roomInfo = [];
var history = {};
var uni = 0;
socketIO.on('connection', function (socket) {

  socket.on('join', function (devId, projectId, userName) {
    let userId = devId;
    let roomID = projectId;
    if (!roomInfo.includes(roomID)) {
      roomInfo.push(roomID);
      history[roomID] = [];
    }
    //push out all the previous chat history belonged to this roomID
    socket.join(roomID);
    socket.emit('history', history[roomID]);
    socketIO.to(roomID).emit('sys', userName + ' is online now!');
  });

  socket.on('message', function (msg,roomID,userId,userNameG,flag) {
    let msgObj = {
      id: userId,
      userName: userNameG,
      message: msg,
      time: new Date()
    };
    history[roomID].push(msgObj);
    let message ={msg:msg,event_id:flag+uni++};
    console.log(message);

    socket.emit('msg', userNameG, message, new Date());
  });

});

//Soccket END
// Add routes, both API and view
app.use(routes);

// Error handling
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // Send the error rather than to show it on the console
    res.status(401).send(err);
  } else {
    next(err);
  }
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/barter");

// Start the API server
server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
