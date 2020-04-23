const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI;
const passport = require("passport");
const users = require("./routes/api/users");
const tiles = require("./routes/api/tiles");
const Room = require("./room");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
// const http = require("http").Server(app);
// const io = require("socket.io")(http, {});

const port = process.env.PORT || 5000;


const rooms = {};
io.on("connect", (socket) => {
  console.log(socket.id + "has been connected");

  socket.on("create", (roomName, handle) => {
    if (!rooms[roomName]) {
    socket.join(roomName);
    socket.emit(
      "receiveMessage",
      `${handle} created and joined Game: ${roomName}`
    );
      const newRoom = new Room(roomName);
      newRoom.addPlayer(handle, socket.id);
      rooms[roomName] = newRoom;
      rooms[roomName].submit(handle);
    } else {
      socket.emit("sendErrors", "this name is already taken");
    }
  });

  socket.on("join", (roomName, handle) => {
    // debugger 
    if(rooms[roomName].playerCount < 4) { 
      socket.join(roomName);
      rooms[roomName].addPlayer(handle, socket.id);
      rooms[roomName].submit(handle);
    } else {
    socket.emit("sendErrors", "sorry, try another room");
    }
    if (rooms[roomName].errors.length > 0) {
      socket.emit("sendErrors", rooms[roomName].errors[0]); // perhaps just send the string directly instead?
    }
    socket.emit("receiveMessage", `${handle} joined ${roomName}`);
    socket.on("disconnect", () => console.log("Client disconnected"));
  });

  // socket.on("submit", (roomName, handle) => {
  //   // debugger 
  //   rooms[roomName].submit(handle);
  // });


  setInterval(function () {
    for (let i in rooms) {
      let room = rooms[i];
      let gameState = room.getGameState();
      // debugger;
      io.to(room.roomName).emit("gameState", gameState);
    }
  }, 2000);
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);








app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch((error) => console.log(error));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/tiles", tiles);

