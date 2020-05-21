import React from "react";
import MyTargetWordContainer from "../my_target_word/my_target_word_container";
import TileBankContainer from "../tile_bank/tile_bank_container";
import CurrentClue from "../current_clue/current_clue";
import RevealedClue from "../revealed_clue/revealed_clue";
import TargetWordsContainer from "../target_words/target_words_container";
import GameOver from "../game_over/game_over";
import Scoreboard from "../scoreboard/scoreboard";

const Game = (props) => {
  const { gameState, socket } = props;

  if (!gameState) return null;

  const players = Object.values(gameState.players);

  let playerTargetWord;
  let revealed = false;

  for (let index = 0; index < players.length; index++) {
    let player = players[index];

    if (player.revealedClue) {
      revealed = true;
      playerTargetWord = player.correctWord;
    }
  }

  return (
    <div>
      <h1 className="logo">Haiclue</h1>
      <div className="game-container">
        <div className="top-container">
          <TargetWordsContainer
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
            <TileBankContainer socket={socket} gameState={gameState} />
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
    </div>
  );
};

export default Game;
