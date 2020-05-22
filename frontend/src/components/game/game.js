import React from "react";
import MyTargetWordContainer from "../my_target_word/my_target_word_container";
import TileBank from "../tile_bank/tile_bank";
import CurrentClue from "../current_clue/current_clue";
import RevealedClue from "../revealed_clue/revealed_clue";
import TargetWords from "../target_words/target_words";
import GameOver from "../game_over/game_over";
import Scoreboard from "../scoreboard/scoreboard";

const Game = (props) => {
  const { gameState, socket } = props;

  if (!gameState) return null;

  const players = Object.values(gameState.players);

  // let playerTargetWord;
  let revealed = false;

  for (let index = 0; index < players.length; index++) {
    let player = players[index];

    if (player.revealedClue) {
      revealed = true;
      // playerTargetWord = player.correctWord;
    }
  }

  return (
    <>
      <h1 className="logo">Haiclue</h1>
      <div className="game-container game-holder">
        <div className="top-container">
          <TargetWords
            revealed={revealed}
            socket={socket}
            gameState={gameState}
          />
        </div>
        {revealed ? (
          <div className="middle-container">
            <RevealedClue
              revealed={revealed}
              socket={socket}
              gameState={gameState}
            />
          </div>
        ) : (
          <div className="middle-container">
            <CurrentClue socket={socket} gameState={gameState} />
            <TileBank socket={socket} gameState={gameState} />
            {gameState.over ? (
              <GameOver socket={socket} gameState={gameState} />
            ) : (
              <></>
            )}
          </div>
        )}
        <div className="bottom-container">
          <MyTargetWordContainer socket={socket} gameState={gameState} />
          <Scoreboard over={gameState.over} players={gameState.players} />
        </div>
      </div>
    </>
  );
};

export default Game;
