const express = require("express");
var cors = require("cors");
const multer = require("multer");
const path = require("path");

var IO = require("socket.io");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.static("client"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//image upload & storage
const storage = multer.diskStorage({
  destination: './client/uploads',
  filename: function(req,file,cb){
    cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));
  }
});

//init upload
const upload = multer ({
  storage:storage,
  limits: {fileSize:1000000},
  fileFilter: function(req,file,cb){
    checkFileType(file,cb);
  }
}).single("userImage");

function checkFileType(file,cb){
  //Allowd extention
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);
  else cb('Error: image file only!!!');
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
    console.log(history);
    socket.emit('history', history[roomID]);
    socketIO.to(roomID).emit('sys', userName + ' is online now!');
  });

  socket.on('message', function (msg,roomID,userId,userNameG,flag,imagePath) {
    console.log(roomID);
    let msgObj = {
      id: userId,
      userName: userNameG,
      message: msg,
      image: imagePath,
      time: new Date()
    };
    history[roomID].push(msgObj);
    console.log(history);
    let message ={msg:msg,event_id:flag+uni,image:imagePath};
    uni++;
    console.log(message);
    console.log(msgObj);

    socketIO.to(roomID).emit('msg', userNameG, message, msgObj, new Date());
  });

});

//Soccket END

//image route
app.post('/upload',(req,res)=>{
  upload(req,res,(err)=>{
    if (err) res.json({err:"Not A Valid file is Uploaded!"});
    else{
      console.log(req.file);
      if (req.file==undefined){
        res.json({err:"No File is Uploaded!"});
      }else{
        res.json({message:"Image is uploaded successfully!", name:req.file.filename});
      }
    }
  })
})

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
