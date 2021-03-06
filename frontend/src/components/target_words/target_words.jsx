import React from "react";
import "../css/layout.css";
import "../css/target_words.css";
import blue from "../images/blue-tile.png";
import red from "../images/red-tile.png";
import green from "../images/green-tile.png";
import yellow from "../images/yellow-tile.png";
import "../css/splash.css";

class TargetWords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "white",
    };
    this.handleSubmitGuess = this.handleSubmitGuess.bind(this);
  }

  handleSubmitGuess(e) {
    e.preventDefault();
    const { gameState, socket } = this.props;

    const currentPlayer = Object.values(this.props.gameState.players).filter(
      (player) => {
        return player.number === gameState.currentPlayerTurn;
      }
    )[0];

    const localPlayer = Object.values(gameState.players).filter((player) => {
      return player.socketId === this.props.socket.id;
    })[0];

    const currentPlayerTargetWord = currentPlayer.targetWord[gameState.currentColor];
    
    const guessedWord = e.currentTarget.nextElementSibling
      ? e.currentTarget.nextElementSibling.innerText
      : e.currentTarget.innerText;

    let guessTargetIndex;

    for (let i = 0; i < gameState.targetWords.length; i++) {
      if (guessedWord === gameState.targetWords[i][gameState.currentColor]) {
        guessTargetIndex = i;
      }
    }

    let matchBoolean = false;
    if (guessedWord === currentPlayerTargetWord) matchBoolean = true;

    socket.emit(
      "submit guess",
      gameState.roomName,
      localPlayer.socketId,
      matchBoolean,
      currentPlayer.socketId,
      guessedWord,
      guessTargetIndex
    );

    const sound = document.getElementById("submit-guess-sound");
    sound.volume = 0.4;
    sound.play();
  }

  render() {
    const { gameState } = this.props;

    if (!gameState) return null;

    let flip; //do we need this?
    if (gameState.currentColor !== this.state.currentColor) {
      flip = true;
    }

    let targetWords;
    if (gameState) {
      targetWords = gameState.targetWords;
    }

    if (!targetWords) return null;

    let cards = [
      { blue: blue },
      { red: red },
      { green: green },
      { yellow: yellow },
    ];
    let currentColor = gameState.currentColor;

    const localPlayer = Object.values(gameState.players).filter((player) => {
      return player.socketId === this.props.socket.id;
    })[0];

    if (gameState.over) {
      return targetWords.map((tile, index) => {
        return (
          <div key={index} className="target-words-container">
            <img
              src={Object.values(cards[index])}
              className="target-img"
              alt={Object.keys(cards[index])}
            />
          </div>
        );
      });
    }

    if (
      gameState.phase === "clue guessing" &&
      localPlayer.number !== gameState.currentPlayerTurn &&
      !localPlayer.submittedGuess &&
      !this.props.revealed
    ) {
      return targetWords.map((tile, index) => {
        let tileSide = tile[currentColor];
        return (
          <div key={index} className="target-words-container">
            <img
              src={Object.values(cards[index])}
              className="target-img hoverable"
              alt={Object.keys(cards[index])}
              onClick={this.handleSubmitGuess}
            />
            {flip ? (
              <div
                onClick={this.handleSubmitGuess}
                className={`color-${currentColor} tile hoverable flip`}
              >
                {tileSide}
              </div>
            ) : (
              <div
                onClick={this.handleSubmitGuess}
                className={`color-${currentColor} tile hoverable`}
              >
                {tileSide}
              </div>
            )}
          </div>
        );
      });
    } else {
      return targetWords.map((tile, index) => {
        let tileSide = tile[currentColor];
        return (
          <div key={index} className="target-words-container">
            <img
              src={Object.values(cards[index])}
              className="target-img"
              alt={Object.keys(cards[index])}
            />
            {flip ? (
              <div className={`color-${currentColor} tile flip`}>
                {tileSide}
              </div>
            ) : (
              <div className={`color-${currentColor} tile`}>{tileSide}</div>
            )}
          </div>
        );
      });
    }
  }
}

export default TargetWords;
