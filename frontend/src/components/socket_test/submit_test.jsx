import React, { Component } from "react";

class SubmitTest extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // debugger
    this.props.socket.emit(
      "submit",
      this.props.roomName,
      this.props.user.handle
    );
  }


  render() {
    const { gameState } = this.props;
    let button;
    let players;
    if (gameState) {
      button = <button onClick={this.handleSubmit}>Click ME!</button>;

      players = Object.values(gameState.players).map(player => {
        return(
          <div key={player.socketId}>
            {player.handle} P: {player.number} : {player.submitted.toString()}
          </div>
        )
      })
      
    } else {
      button = null;
      players = null
    }

   

    return (
      <div>
        {button}
        {/* <button onClick={this.handleSubmit}>Click ME!</button> */}
        {players}
      </div>
    );
  }
}

export default SubmitTest;
