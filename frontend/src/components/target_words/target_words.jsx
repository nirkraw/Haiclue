import React from "react";
import Scoreboard from "./scoreboard";
import GameOver from "../game_over/game_over";
import "../css/layout.scss";
import "../css/target_words.css";
import blue from "../images/blue-tile.png";
import red from "../images/red-tile.png";
import green from "../images/green-tile.png";
import yellow from "../images/yellow-tile.png";


class TargetWords extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentColor: "white"
    }

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

    let matchBoolean = false
    if (guessedWord === currentPlayerTargetWord) matchBoolean= true;
    
    socket.emit("submit guess", gameState.roomName, localPlayer.handle, matchBoolean, currentPlayer.handle)
  }

  render() {
    const { gameState } = this.props;

    
    if(!gameState) return null; 

    let flip;
    if (gameState.currentColor !== this.state.currentColor) {
        flip = true;
    }

    if(gameState.over) {
        return (
          <div>
            
            <GameOver
              gameState={gameState}
            />
          </div>
        )
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
            {(flip) 
            ? <div onClick={this.handleSubmitGuess} className={`color-${currentColor} tile hoverable flip`} >{tileSide}</div>
            : <div onClick={this.handleSubmitGuess} className={`color-${currentColor} tile hoverable`} >{tileSide}</div>
            }
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
            {(flip) 
            ? <div className={`color-${currentColor} tile flip`}>{tileSide}</div>
            : <div className={`color-${currentColor} tile`}>{tileSide}</div>
            }
          </div>
        );
      });
    }

    setTimeout(() => {
      this.setState({ currentColor: gameState.currentColor })
      flip = false; 
    }, 1300);
    

    return (
      <div>
        <div>
              {newTargetWords}
        </div>
        <Scoreboard players= {gameState.players}/>
      </div>
    );



  }
}

export default TargetWords;
