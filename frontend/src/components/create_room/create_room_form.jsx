import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Game from "../game/game";
import ENV from "../../util/socket_env";
import Logout from "../global/logout-instructions-button";
import "../css/create_room.css";
import red from "../images/red-tile.png";
import blue from "../images/blue-tile.png";
import green from "../images/green-tile.png";
import yellow from "../images/yellow-tile.png";
import song from "../../music/FunkJam.mp3";
import mute from "../images/mute.png";
import unmute from "../images/unmute.png";
import tileSound from "../../music/tile.wav";
import submitSound from "../../music/submit.wav";
import gameOverSound from "../../music/gameOver.wav";
import submitGuessSound from "../../music/submitWord.wav";
import timeUp from "../../music/time-up.wav";
import countdown from "../../music/countdown.wav";

export default class CreateRoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: "",
      message: "",
      gameState: null,
      readOnly: false,
      options: false,
      rounds: 3,
      timer: false,
      playing: true,
      demoStart: false,
    };

    this.handleRoomJoin = this.handleRoomJoin.bind(this);
    this.handleRoomCreate = this.handleRoomCreate.bind(this);
    this.handleRandomCreate = this.handleRandomCreate.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.mainMenu = this.mainMenu.bind(this);
    this.startGame = this.startGame.bind(this);
    this.changeRounds = this.changeRounds.bind(this);
    this.changeTimer = this.changeTimer.bind(this);
    this.muteAndUnmute = this.muteAndUnmute.bind(this);
    this.demoGame = this.demoGame.bind(this);
  }

  componentDidMount() {
    const audio = document.getElementById("theme");
    audio.volume = 0.05;
    audio.loop = true;
    // audio.play();
    this.props.fetchTiles();
    this.socket = socketIOClient(ENV);

    this.socket.on("game state", (gameState) => {
      this.setState({ gameState: gameState });
    });

    this.socket.on("receive message", (data) => {
      this.setState({ message: data });
    });

    this.socket.on("send errors", (data) => {
      this.setState({ message: data });
      {
        if (data === "This name is already taken") {
          this.setState({ options: false });
        }
      }
    });

    this.socket.on("disconnect reload", () => {
     window.location.reload();
     this.setState({ message: "Player disconnected, Game Over" });
    });
  }

  handleInput(field) {
    return (e) => {
      let upcase_room_name = e.currentTarget.value.toUpperCase();
      this.setState({ [field]: upcase_room_name });
    };
  }

  randomRoom() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    let room = "";
    for (let i = 0; i < 4; i++) {
      room += chars[Math.floor(Math.random() * 25)];
    }
    return room;
  }

  handleRoomCreate(event) {
    event.preventDefault();
    const { roomName } = this.state;
    this.props.storeRoomName(roomName);
    this.socket.emit("create", roomName, this.props.user.handle);
    this.setState({ roomName: "", options: true });
  }

  handleRandomCreate(event) {
    event.preventDefault();
    let roomName = this.randomRoom();
    this.props.storeRoomName(roomName);
    this.socket.emit("create", roomName, this.props.user.handle);
    this.setState({ roomName: roomName, options: true });
  }

  handleRoomJoin(event) {
    event.preventDefault();
    const { roomName } = this.state;
    this.props.storeRoomName(roomName);
    this.socket.emit(
      "join",
      roomName,
      this.props.user.handle,
      this.props.tiles
    );
    this.setState({ roomName: "" });
  }

  startGame(event) {
    event.preventDefault();
    this.socket.emit(
      "start game",
      this.state.roomName,
      this.props.tiles,
      this.state.rounds,
      this.state.timer
    );
  }

  mainMenu(event) {
    if (event !== undefined) {
      event.preventDefault();
    }
    window.location.reload();
  }

  changeRounds(event) {
    event.preventDefault();
    if (event.currentTarget.innerText === "+") {
      this.setState({ rounds: this.state.rounds + 1 });
    } else {
      if (this.state.rounds === 1) return;
      this.setState({ rounds: this.state.rounds - 1 });
    }
  }

  changeTimer(event) {
    event.preventDefault();
    if (this.state.timer) {
      this.setState({ timer: false });
    } else {
      this.setState({ timer: true });
    }
  }

  muteAndUnmute() {
    const audio = document.getElementById("theme");
    if (!this.state.playing) {
      audio.volume = 0.05;
      this.setState({ playing: true });
    } else {
      audio.volume = 0;
      this.setState({ playing: false });
    }
  }

  demoGame(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState({ demoStart: true });
    this.socket.emit("demo", this.props.user.handle, "demo", this.props.tiles);
  }

  render() {
    if (
      this.props.user.handle === "Demo" &&
      this.socket &&
      !this.state.demoStart
    ) {
      this.demoGame();
    }

    const { gameState } = this.state;
    let welcome = "Create or Join a Room";

    if (this.state.message) welcome = this.state.message;

    let players;

    if (gameState) {
      let joinedPlayers = Object.values(gameState.players).filter(
        (player) => player.joined
      );

      players = joinedPlayers.map((player) => {
        return <div key={player.socketId}>{player.handle} joined!</div>;
      });
    } else {
      players = null;
    }

    let placeholder_text;

    if (this.state.roomName) {
      placeholder_text = this.state.roomName;
    } else {
      placeholder_text = "Enter a Room Name";
    }

    // see if better way to do this
    // let readOnlyVal =
    //   this.state.message &&
    //   this.state.message !==
    //     ("This name is already taken" ||
    //       "A game must have at least two players" ||
    //       "Sorry, this room is full")
    //     ? true
    //     : false;

    let readOnlyVal =
      this.state.message &&
      this.state.message !== "Could not find a room with that name"
        ? true
        : false;

    let joinRoom =
      !gameState || !gameState.gameStarted ? (
        <>
          <h1 className="logo">Haiclue</h1>
          <div className="splash-container">
            <section className="splash-cards">
              <img src={blue} alt="blue" />
              <img src={green} alt="green" />
              <img src={red} alt="red" />
              <img src={yellow} alt="yellow" />
            </section>
          </div>
          <div className="room-container">
            {this.state.message ? (
              <h1>{this.state.message}</h1>
            ) : (
              <h1>{welcome}</h1>
            )}
            <form>
              <label>
                <input
                  type="text"
                  placeholder={placeholder_text}
                  value={this.state.roomName}
                  onChange={this.handleInput("roomName")}
                  readOnly={readOnlyVal}
                />
              </label>
              {this.state.options ? (
                <>
                  <div className="create-button-container">
                    <button className="button-stylez" onClick={this.mainMenu}>
                      Back
                    </button>
                    <div className="round-container">
                      Rounds
                      <button className="rounds" onClick={this.changeRounds}>
                        -
                      </button>
                      {this.state.rounds}
                      <button className="rounds" onClick={this.changeRounds}>
                        +
                      </button>
                    </div>
                    {this.state.timer ? (
                      <div className="timer-on-off-container">
                        Timer
                        <button className="timer-on-active">On/</button>
                        <button
                          className="timer-off"
                          onClick={this.changeTimer}
                        >
                          Off
                        </button>
                      </div>
                    ) : (
                      <div className="timer-on-off-container">
                        Timer
                        <button className="timer-on" onClick={this.changeTimer}>
                          On/
                        </button>
                        <button className="timer-off-active">Off</button>
                      </div>
                    )}
                    <button className="button-stylez" onClick={this.startGame}>
                      Start Game
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="create-button-container">
                    <button
                      className="button-stylez butts"
                      type="submit"
                      onClick={this.handleRoomJoin}
                    >
                      Join
                    </button>
                    {/* <button
                      className="button-stylez butts"
                      type="submit"
                      onClick={this.handleRoomCreate}
                    >
                      Create
                    </button> */}
                    <button
                      className="button-stylez butts"
                      type="submit"
                      onClick={this.handleRandomCreate}
                    >
                      Create
                    </button>
                    {/* <button
                      className="button-stylez butts"
                      type="submit"
                      onClick={this.demoGame}
                    >
                      Demo Game
                    </button> */}
                  </div>
                </>
              )}
            </form>
            <div className="players-create-container">{players}</div>
          </div>
        </>
      ) : null;

    let view =
      gameState && gameState.gameStarted ? (
          <Game 
            handle={this.props.user.handle}
            gameState={this.state.gameState}
            socket={this.socket}
          />
      ) : (
        joinRoom
      );

    return (
      <>
        {gameState ? (
          <Logout
            quit={this.mainMenu}
            start={gameState.gameStarted}
            handle={this.props.user.handle}
            logout={this.props.logout}
            loggedIn={this.props.loggedIn}
          />
        ) : (
          <Logout
            quit={this.mainMenu}
            start={false}
            handle={this.props.user.handle}
            logout={this.props.logout}
            loggedIn={this.props.loggedIn}
          />
        )}
        {this.state.playing ? (
          <img
            onClick={this.muteAndUnmute}
            className="mute"
            src={unmute}
            alt="unmute"
          />
        ) : (
          <img
            onClick={this.muteAndUnmute}
            className="mute"
            src={mute}
            alt="mute"
          />
        )}
        <audio id="theme" src={song}></audio>
        <audio id="tile-sound" src={tileSound}></audio>
        <audio id="submit-sound" src={submitSound}></audio>
        <audio id="game-over-sound" src={gameOverSound}></audio>
        <audio id="submit-guess-sound" src={submitGuessSound}></audio>
        <audio id="time-up-sound" src={timeUp}></audio>
        <audio id="countdown" src={countdown}></audio>
        {view}
      </>
    );
  }
}
