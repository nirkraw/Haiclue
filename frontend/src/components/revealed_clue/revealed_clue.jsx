import React, {useContext} from "react";
import blue from "../images/blue-tile.png";
import red from "../images/red-tile.png";
import green from "../images/green-tile.png";
import yellow from "../images/yellow-tile.png";
import "../css/revealed-clue.css";
import "../css/layout.css";
import {MyContext} from '../game/game'

const RevealedClue = (props) => {
  const cards = {
    0: blue,
    1: red,
    2: green,
    3: yellow,
  };

  const gameState = useContext(MyContext)
  // const { gameState } = props;
  if (!gameState) return null;

  const players = Object.values(gameState.players);

  let playerHandle;
  let playerTargetWord;
  let playerTargetIndex;

  for (let index = 0; index < players.length; index++) {
    let player = players[index];

    if (player.revealedClue) {
      playerHandle = player.handle;
      playerTargetWord = player.correctWord;
      playerTargetIndex = player.correctIndex;
    }
  }

  const otherPlayersGuesses = players.map((player, idx) => {
    let x = gameState.currentPlayerTurn - 1;
    if (x === 0) {
      x = players.length;
    }

    if (player.number !== x) {
      return (
        <li key={idx} className="guess-li">
          <span>
            {player.handle}'s guess was{" "}
            <span className="color-yellow">{player.guessedWord}</span>
          </span>
          {player.guessIndex 
          ? <img src={cards[player.guessIndex]} className="guess-img" alt="guess-card"></img>
          : <div></div>
          } 
        </li>
      );
    } else {
      return null
    }

  });

  if (playerTargetWord) {
    return (
      <>
        <h1 className="revealed-clue-text">
          {playerHandle}'s word was{" "}
          <span className="color-yellow">{playerTargetWord}!</span>
        </h1>
        <img
          src={cards[playerTargetIndex]}
          className="revealed-clue-img "
          alt="green"
        />
        <ul className="player-guesses">{otherPlayersGuesses}</ul>
      </>
    );
  } else {
    return null;
  }
};

export default RevealedClue;
