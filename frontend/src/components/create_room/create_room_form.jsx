import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import GameContainer from '../game/game_container';
import ENV from '../../util/socket_env';
import '../css/create_room.css';

export default class CreateRoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: "",
      message: "",
      errors: "",
      gameState: null
    };

    this.handleRoomJoin = this.handleRoomJoin.bind(this);
    this.handleRoomCreate = this.handleRoomCreate.bind(this);
    this.handleRandomCreate = this.handleRandomCreate.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.props.fetchTiles(); 
    this.socket = socketIOClient(ENV); 

    this.socket.on("gameState", (gameState) => { 
      this.setState({gameState: gameState})
    });

    this.socket.on("receiveMessage", (data) => {
      this.setState({ message: data });
    });
    
    this.socket.on("sendErrors", (data) => {
      this.setState({ errors: data });
    });
    
    this.socket.on("connect", (socket) => {
      console.log("Frontend Connected! Socket Id: " + this.socket.id);
    });
    console.log("######################################It has mounted again ########################################")
  }
  
  handleInput(field) { 
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleRoomCreate(event) {
    event.preventDefault();
    debugger;
    const { roomName} = this.state;
    this.props.storeRoomName(roomName);
    this.socket.emit("create", roomName, this.props.user.handle);
    this.setState({ roomName: ""});
  }

  randomRoom() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    let room = ""
    for (let i = 0; i < 4; i++) {
      room += chars[Math.floor(Math.random()*35)]
    }
    return room
  }

  handleRandomCreate(event) {
    event.preventDefault();
    let roomName = this.randomRoom()
    this.props.storeRoomName(roomName);
    this.socket.emit("create", roomName, this.props.user.handle);
    this.setState({ roomName: roomName});
  }

  handleRoomJoin(event) {
    event.preventDefault();
    const { roomName } = this.state;
    this.props.storeRoomName(roomName);
    this.socket.emit(
      "join",
      roomName,
      this.props.user.handle,
      this.props.tiles.slice(60),
      this.props.tiles.slice(0, 60)
    );
    this.setState({ roomName: ""});
  }
  
  render() {
    const {gameState} = this.state
    let welcome = "Create or Join a Room";
    if (this.state.message) welcome = this.state.message;
    let players;

    if(gameState) {
    let joinedPlayers = Object.values(gameState.players).filter(player => player.joined) 
    players = joinedPlayers.map(player => {
      return (
        <div key={player.socketId}>
                {player.handle} joined! 
              </div>)
    })
    } else {
      players = null;
    }
  
    let placeholder_text = (this.state.roomName.length) ? (this.state.roomName) : "Enter a Room Name" ;
    
    let readOnlyVal =
      this.state.message.length &&
      this.state.message !== "this name is already taken"
        ? true
        : false;

    let joinRoom = (
      <div className="room-container">
        <div className="logout-button">
          {this.props.loggedIn ? (
            <div className="tile" onClick={this.props.logout}>
              Logout
            </div>
          ) : null}
        </div>

        {this.state.errors ? <h1>{this.state.errors}</h1> : <h1>{welcome}</h1>}
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
          <button
            className="butts"
            type="submit"
            onClick={this.handleRoomCreate}
          >
            Create
          </button>
          <button className="butts" type="submit" onClick={this.handleRoomJoin}>
            Join
          </button>
          <button
            className="butts"
            type="submit"
            onClick={this.handleRandomCreate}
          >
            Random
          </button>
        </form>
        <div className="players-create-container">{players}</div>
      </div>
    ); 


    let view = (gameState) ? 
        ((gameState.gameStarted) ? 
            (<div>
              <div className="players-container">{players}</div>
              <GameContainer gameState={this.state.gameState} socket={this.socket}/> </div>)
            : (joinRoom))   
        : (joinRoom)

    return (<>
        {view}
      </>
    );
  }
}