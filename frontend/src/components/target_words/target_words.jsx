import React from "react";
import Scoreboard from "./scoreboard";
import "../css/layout.css";
import "../css/target_words.css";
import blue from "../images/blue-tile.png";
import red from "../images/red-tile.png";
import green from "../images/green-tile.png";
import yellow from "../images/yellow-tile.png";

class TargetWords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "black", //change this later 
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

    const localPlayer = Object.values(gameState.players).filter(
      (player) => {
        return player.handle === this.props.user.handle;
      }
    )[0];

    const currentPlayerTargetWord = currentPlayer.targetWord[gameState.currentColor];
    const guessedWord = (e.currentTarget.nextElementSibling) 
     ?
     e.currentTarget.nextElementSibling.innerText
     :
     e.currentTarget.innerText

     
    if (guessedWord === currentPlayerTargetWord) {
      socket.emit("submit guess", gameState.roomName, localPlayer.handle, true, currentPlayer.handle)
      // tell the backend that a guess was submitted
      // increment points for localPlayer and currentPlayer
      // when all guesses are submitted ( total number of players - 1), then reveal currentPlayer targetWord, and the new points totals 
    } else {
      socket.emit("submit guess", gameState.roomName, localPlayer.handle, false, currentPlayer.handle)
      // tell the backend that a guess was submitted
      
      // when all guesses are submitted ( total number of players - 1), then reveal currentPlayer targetWord, and the new points totals 
    }
  
  }

  render() {
    const { gameState } = this.props;

    if(!gameState) return null; 

    let targetWords;
    if (gameState) {
      targetWords = gameState.targetWords;
    }
    if (!targetWords) return null;

    let selectorTri = (
      <svg
        width="100%"
        height="80px"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M -200 100 L 600 100 L 200 300 z"
          fill="white"
          stroke="white"
          stroke-width="3"
        />
      </svg>
    );

    let cards = [
      { blue: blue },
      { red: red },
      { green: green },
      { yellow: yellow },
    ];
    let currentColor = this.state.currentColor;

    const localPlayer = Object.values(gameState.players).filter(
      (player) => {
        return player.handle === this.props.user.handle;
      }
    )[0];

    let newTargetWords;
    if (gameState.phase === "clue guessing" && localPlayer.number !== gameState.currentPlayerTurn) {
      newTargetWords = targetWords.map((tile, index) => {
        let tileSide = tile[currentColor]; //string "casino"
        return (
          <div key={index} className="target-words-container">
            <img
              src={Object.values(cards[index])}
              className="target-img"
              alt={Object.keys(cards[index])}
              onClick={this.handleSubmitGuess}
            />
            <div onClick={this.handleSubmitGuess} className={`color-${currentColor} tile`}>{tileSide}</div>
          </div>
        );
      });
    } else {
      newTargetWords = targetWords.map((tile, index) => {
        let tileSide = tile[currentColor]; //string "casino"
        return (
          <div key={index} className="target-words-container">
            <img
              src={Object.values(cards[index])}
              className="target-img"
              alt={Object.keys(cards[index])}
              
            />
            <div 
              className={`color-${currentColor} tile`}
              >{tileSide}
            </div>
          </div>
        );
      });
    }

    // if gamephase = to clue phase 

    // map new target words

    // add onlick

    return (
      <div>
        <div>
          <h3>Target Words</h3>
          {newTargetWords}
        </div>
        <Scoreboard
        // playerOne={this.props.playerOne}
        // playerTwo={this.props.playerTwo}
        // playerThree={this.props.playerThree}
        // playerFour={this.props.playerFour}
        // takes in as props, the guess from target words
        />
      </div>
    );
  }
}

export default TargetWords;
