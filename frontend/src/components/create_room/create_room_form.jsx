import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import GameContainer from '../game_container';
import ENV from '../../util/socket_env';

export default class CreateRoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: this.props.user.handle,
      roomName: "",
      message: "",
      errors: "",
      gameState: null 
    };

    this.handleRoomJoin = this.handleRoomJoin.bind(this);
    this.handleRoomCreate = this.handleRoomCreate.bind(this);
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
      this.setState({ [field]: e.target.value });
    };
  }

  handleRoomCreate(event) {
    event.preventDefault();
    // debugger
    const { roomName, handle } = this.state;
    this.props.storeRoomName(roomName);
    this.socket.emit("create", roomName, handle);
    this.setState({ roomName: "", handle: "" });
  }

  handleRoomJoin(event) {
    event.preventDefault();
    const { roomName, handle } = this.state;
    this.props.storeRoomName(roomName);
    this.socket.emit("join", roomName, handle, this.props.tiles.slice(60));
    this.setState({ roomName: "", handle: "" });
  }

  

  render() {
    const {gameState} = this.state
    let welcome = "not joined";
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
      
    return (
      <div className="">
        {this.state.errors ? <h1>{this.state.errors}</h1> : <h1>{welcome}</h1>}
        <form>
          <label>
            Room Name
            <input
              type="text"
              placeholder="Enter Room Name"
              value={this.state.roomName}
              onChange={this.handleInput("roomName")}
            />
          </label>
          <button className="butts" type="submit" onClick={this.handleRoomCreate}>
            Create
          </button>
          <button className="butts" type="submit" onClick={this.handleRoomJoin}>
            Join
          </button>
        </form>
         {players}
        <GameContainer gameState={this.state.gameState} socket={this.socket} />
      </div>
    );
  }
}