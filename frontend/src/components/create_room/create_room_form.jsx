import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import GameContainer from '../game_container';
import ENV from '../../util/socket_env';
import '../css/create_room.css';

export default class CreateRoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: this.props.user.handle,
      roomName: "",
      message: "",
      errors: "",
      gameState: null, 
      readOnly: false,
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
      // debugger 
      this.setState({gameState: gameState})
    });

    this.socket.on("receiveMessage", (data) => {
      // debugger
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
    const { roomName, handle } = this.state;
    this.props.storeRoomName(roomName);
    this.socket.emit("create", roomName, handle);
    this.setState({ roomName: "", handle: "", readOnly: true});
  }

  randomRoom() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let room = ""
    for (let i = 0; i < 4; i++) {
      room += chars[Math.floor(Math.random()*61)]
    }
    return room
  }

  handleRandomCreate(event) {
    event.preventDefault();
    const { handle } = this.state;
    let roomName = this.randomRoom()
    this.props.storeRoomName(roomName);
    this.socket.emit("create", roomName, handle)
    this.setState({ roomName: roomName, handle: "", readOnly: true });
  }

  handleRoomJoin(event) {
    event.preventDefault();
    const { roomName, handle } = this.state;
    this.props.storeRoomName(roomName);
    this.socket.emit("join", roomName, handle, this.props.tiles.slice(60), this.props.tiles.slice(0, 60));
    this.setState({ roomName: "", handle: "" });
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
    // let readOnly = (this.state.readOnly) ? "readOnly" : null; 
    let joinRoom = (<div className="room-container"> 
          
          <div className="logout-button">
              {this.props.loggedIn ? <div className="tile" onClick={this.props.logout}>Logout</div> : null}
          </div>

          {this.state.errors ? <h1>{this.state.errors}</h1> : <h1>{welcome}</h1>}    
          <form>
            <label>
              <input
                type="text"
                placeholder={placeholder_text}
                value={this.state.roomName}
                onChange={this.handleInput("roomName")}
                // {...readOnly}
              />
            </label>
            <button className="butts" type="submit" onClick={this.handleRoomCreate}>
              Create
            </button>
            <button className="butts" type="submit" onClick={this.handleRoomJoin}>
              Join
            </button>
            <button className="butts" type="submit" onClick={this.handleRandomCreate}>
              Random
            </button>
          </form>
            <div className="players-create-container">{players}</div>
        </div>) 


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
