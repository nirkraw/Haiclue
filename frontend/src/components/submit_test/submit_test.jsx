import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import {Link} from "react-router-dom";

class SubmitTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneSubmitted: false,
      playerTwoSubmitted: false,
      endpoint: "http://localhost:5000/#/create-room",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { endpoint } = this.state;
    this.socket = socketIOClient(endpoint);

    this.socket.on("gameState", (gameState) => {
        debugger 
      for (let i in gameState.players) {
        let player = gameState.players[i];
        if (player.number === 1 && player.submitted) {
          this.setState({ playerOneSubmitted: true });
        }
        if (player.number === 2 && player.submitted) {
          this.setState({ playerTWoSubmitted: true });
        }
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // debugger
    this.socket.emit("submit", this.props.roomName, this.props.user.handle);
  }

  render() {
    const playerOne = this.state.playerOneSubmitted ? (
      <p>Player One: True</p>
    ) : (
      <p>Player One: False</p>
    );
    const playerTwo = this.state.playerTwoSubmitted ? (
      <p>Player Two: True</p>
    ) : (
      <p>Player Two: False</p>
    );

    return (
      <div>
        <button onClick={this.handleSubmit}>Click ME!</button>
        {playerOne}
        {playerTwo}
      </div>
    );
  }
}

export default SubmitTest;
