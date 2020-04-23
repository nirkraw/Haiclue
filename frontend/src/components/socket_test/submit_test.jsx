import React, { Component } from "react";

class SubmitTest extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.socket.emit(
      "submit",
      this.props.roomName,
      this.props.user.handle
    );
  }

  render() {
    const { gameState } = this.props;
    debugger;
    let playerOne = <p>Player One: False</p>;
    let playerTwo = <p>Player Two: False</p>;
    if (gameState) {
      for (let i in gameState.players) {
        let player = gameState.players[i];
        if (player.number === 1 && player.submitted) {
          playerOne = <p>Player One: True</p>;
        }
        if (player.number === 2 && player.submitted) {
          playerTwo = <p>Player Two: True</p>;
        }
      }
    }

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
