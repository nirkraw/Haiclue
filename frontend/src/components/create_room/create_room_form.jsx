import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import GameContainer from '../game/game_container';
import ENV from '../../util/socket_env';
import Logout from '../global/logout-instructions-button'; 
import '../css/create_room.css';
import red from '../images/red-tile.png';
import blue from '../images/blue-tile.png';
import green from '../images/green-tile.png';
import yellow from '../images/yellow-tile.png';

export default class CreateRoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: "",
      message: "",
      errors: "",
      gameState: null, 
      readOnly: false,
      options: false,
      rounds: 3,
      timer: false
    };

    this.handleRoomJoin = this.handleRoomJoin.bind(this);
    this.handleRoomCreate = this.handleRoomCreate.bind(this);
    this.handleRandomCreate = this.handleRandomCreate.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.mainMenu = this.mainMenu.bind(this);
    this.startGame = this.startGame.bind(this);
    this.changeRounds = this.changeRounds.bind(this);
    this.changeTimer = this.changeTimer.bind(this);
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
      {if (data === "this name is already taken") {
        this.setState({options: false})
      }}
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
    const { roomName } = this.state;
    this.props.storeRoomName(roomName);
    this.socket.emit("create", roomName, this.props.user.handle);
    this.setState({ roomName: "", options: true});
  }

  randomRoom() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    let room = ""
    for (let i = 0; i < 4; i++) {
      room += chars[Math.floor(Math.random()*25)]
    }
    return room
  }

  handleRandomCreate(event) {
    event.preventDefault();
    let roomName = this.randomRoom()
    this.props.storeRoomName(roomName);
    this.socket.emit("create", roomName, this.props.user.handle);
    this.setState({ roomName: roomName, options: true});
  }


  handleRoomJoin(event) {
    event.preventDefault();
    const { roomName } = this.state;
    this.props.storeRoomName(roomName.toUpperCase());
    this.socket.emit("join", roomName.toUpperCase(), this.props.user.handle, this.props.tiles);
    this.setState({ roomName: "" });
  }

  mainMenu(event) {
   if (event !== undefined) {
     event.preventDefault();
   }
    window.location.reload();
  }

  startGame(event) {
    event.preventDefault();
    this.socket.emit("startGame", this.state.roomName, this.props.tiles, this.state.rounds, this.state.timer)
  }

  changeRounds(event) {
    event.preventDefault();
    if(event.currentTarget.innerText === "+") {
      this.setState({rounds: (this.state.rounds + 1)}) 
    } else {
       if(this.state.rounds === 1) return;
       this.setState({rounds: (this.state.rounds - 1)}) 
    }
  }

  changeTimer(event) {
    event.preventDefault();
    if (this.state.timer) {
      this.setState({timer: false})
    } else {
      this.setState({timer: true})
    }
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
    let readOnlyVal = this.state.message.length &&
      this.state.message !== ("this name is already taken" || "couldn't find a room with that name" || "sorry, this room is full")
        ? true
        : false;
    let joinRoom = (<>
      <h1 className='logo'>Haiclue</h1>
      <div className='splash-container'>
        <section className="splash-cards">
          <img src={blue} alt="blue" />
          <img src={green} alt="green" />
          <img src={red} alt="red" />
          <img src={yellow} alt="yellow" />
        </section>
      </div>
      <div className="room-container">
        <Logout logout={this.props.logout} loggedIn={this.props.loggedIn} />

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
          {this.state.options
          ? <> 
            <button className="button-stylez" onClick={this.mainMenu}>Main Menu</button>
            <div className="round-container">
                Rounds 
                <button className="rounds" onClick={this.changeRounds}>-</button>
                  {this.state.rounds} 
                <button className="rounds" onClick={this.changeRounds}>+</button>
            </div> 
              {(this.state.timer) 
                ? <div className="timer-on-off-container">
                  Timer
                <button className="timer-on-active" >On/</button>
                  <button className="timer-off" onClick={this.changeTimer}>Off</button>
                </div> 
                : <div className="timer-on-off-container">
                  Timer
                <button className="timer-on" onClick={this.changeTimer}>On/</button>
                  <button className="timer-off-active" >Off</button>
                </div> 
                }        
            <button className="button-stylez" onClick={this.startGame}>Start Game</button>
            {/* <button className="button-stylez">Timer Off</button> */}
            {/* <button className="button-stylez">Join Link</button> */}
            {/* <button>Timer On</button>  */}
          </>
          : <>
            <div className="cr-button-container">
            <button className="button-stylez butts" type="submit" onClick={this.handleRoomJoin}>
              Join
            </button>
            <button
              className="button-stylez butts"
              type="submit"
              onClick={this.handleRoomCreate}>
              Create
            </button>
            <button
              className="button-stylez butts"
              type="submit"
              onClick={this.handleRandomCreate}>
              Random
            </button>
            </div>
          </>}
        </form>
        <div className="players-create-container">{players}</div>
      </div>
      </>
    ); 

    let view = (gameState) ? 
        ((gameState.gameStarted) ? 
            (<div>
              {/* <div className="players-container">{players}</div> */}
              <GameContainer gameState={this.state.gameState} socket={this.socket}/> </div>)
            : (joinRoom))   
        : (joinRoom)

        
    return (
      <>
        {view}
      </>
    );
  }
}