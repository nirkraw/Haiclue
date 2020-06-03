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
const port = process.env.PORT || 5000;
const DemoRoom = require("./demo_room");
const rooms = {};

io.on("connect", (socket) => {
  console.log(socket.id + "has been connected");

  socket.on("create", (roomName, handle) => {
    //need errors for no empty room name
    if (!rooms[roomName]) {
      socket.join(roomName);
      socket.emit(
        "receive message",
        `${handle} created and joined Game: ${roomName}`
      );
      const newRoom = new Room(roomName);
      newRoom.addPlayer(handle, socket.id); //we can switch these two lines and do rooms[roomName].addPlayer
      rooms[roomName] = newRoom;
      rooms[roomName].submit(socket.id);
    } else {
      socket.emit("send errors", "This name is already taken");
    }
  });

  socket.on("start game", (roomName, tiles, rounds, timer) => {
    if (rooms[roomName].playerCount > 1) {
      rooms[roomName].storeTiles(Object.values(tiles));
      rooms[roomName].startGame(rounds, timer);
    } else {
      socket.emit("send errors", "A game must have at least two players");
    }
  });

  socket.on("join", (roomName, handle) => {
    if (!rooms[roomName]) {
      socket.emit("send errors", "Could not find a room with that name");
    } else {
      if (rooms[roomName].playerCount < 10 && !rooms[roomName].game.gameStarted) {
        socket.join(roomName);
        rooms[roomName].addPlayer(handle, socket.id);
        rooms[roomName].submit(socket.id);
        socket.emit("receive message", `${handle} joined ${roomName}`);
      } else {
        socket.emit("send errors", "Sorry, this room is full");
      }
    }
  });

  socket.on("select clue tile", (roomName, tile) => {
    if (rooms[roomName]) {
      rooms[roomName].selectClueTile(socket.id, tile);
    }
  });

  socket.on("remove clue tile", (roomName, tile) => {
    if (rooms[roomName]) {
      rooms[roomName].unselectClueTile(socket.id, tile);
    }
  });

  socket.on("submit clue", (roomName) => {
    if (rooms[roomName]) {
      rooms[roomName].submitClue(socket.id);
    }
  });

  socket.on(
    "submit guess",
    (
      roomName,
      localPlayerSocketId,
      matchBoolean,
      currentPlayerSocketId,
      guessedWord,
      guessIndex
    ) => {
      if (rooms[roomName]) {
        rooms[roomName].submitGuess(
          localPlayerSocketId,
          matchBoolean,
          currentPlayerSocketId,
          guessedWord,
          guessIndex
        );
      }
    }
  );

  socket.on("unreveal clue", (roomName) => {
    if (rooms[roomName]) {
      rooms[roomName].unrevealClue(socket.id);
    }
  });

  socket.on("insert line", (roomName) => {
    if (rooms[roomName]) {
      rooms[roomName].insertLine(socket.id);
    }
  });

  socket.on("remove line", (roomName, lineIndex) => {
    if (rooms[roomName]) {
      rooms[roomName].removeLine(socket.id, lineIndex);
    }
  });

  socket.on("play again", (roomName) => {
    if (rooms[roomName]) {
      rooms[roomName].restartGame();
    }
  });

  socket.on("demo", (handle, roomName, tiles) => {
    socket.join(roomName);
    const demoRoom = new DemoRoom(roomName);
    rooms[roomName] = demoRoom;
    rooms[roomName].addPlayer(handle, socket.id);
    rooms[roomName].addPlayer("Khaleel", "2");
    rooms[roomName].addPlayer("Sara", "3");
    rooms[roomName].storeTiles(Object.values(tiles));
    rooms[roomName].startGame();

    if (rooms[roomName].phase === "clue guessing") {
      rooms[roomName].guessingPhase();
    }
  });

  // socket.on("disconnect", () => console.log("Client disconnected"));
  socket.on("disconnect", () => {
    for (let i in rooms) {
      let room = rooms[i];
      let gameState = room.getGameState();
      if (gameState.players.hasOwnProperty(socket.id)) {
        console.log("player disconnected, game over");
        io.to(room.roomName).emit("disconnect reload");
      }
    }
    console.log("Client disconnected");
  });
}); // end of "connect" DONT DELETE

setInterval(function () {
  for (let i in rooms) {
    let room = rooms[i];
    let gameState = room.getGameState();
    io.to(room.roomName).emit("game state", gameState);
  }
}, 100);

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
