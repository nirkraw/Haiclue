const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI;
const passport = require("passport");
// const User = require("./models/User");
const users = require("./routes/api/users");
const tiles = require("./routes/api/tiles");

const http = require("http");
// const http = require("http").Server(app);
// const io = require("socket.io")(http, {});
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 4000;
// const port = process.env.PORT || 5000;
// const socket_list = {};
// let data_holder = 0;

io.on("connection", (socket) => {
  console.log("New client connected");
  // socket.id = Math.random();
  // socket_list[socket.id] = socket;
  
  socket.on("incoming data", (data) => {     
    // data_holder = data 
    // socket.broadcast.emit("outgoing data", {num: data});
    // socket.emit("outgoing", { num: data });
    // for (let i in socket_list) {
    //   let socket = socket_list[i];
    //   debugger
    // }
    io.sockets.emit("outgoing", {num: data});
  });
  
  // setInterval(function () {
  //   for (let i in socket_list) {
  //     let socket = socket_list[i];
  //     debugger
  //     socket.emit("outgoing", {num: data_holder});
  //   }
  // }, 1000 / 25);



  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// app.get("/", (req, res) => {
//     // const user = new User({
//     //     handle: "jim",
//     //     email: "jim@jim.jim",
//     //     password: "jimisgreat123"
//     // })
//     // user.save();
//     res.send("Hello World!");
// });

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch((error) => console.log(error));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/tiles", tiles);