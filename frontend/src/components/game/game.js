import React from "react";
import MyTargetWordContainer from "../my_target_word/my_target_word_container";
import TileBankContainer from "../tile_bank/tile_bank_container";
import CurrentClueContainer from "../current_clue/current_clue_container";
import RevealedClue from "../revealed_clue/revealed_clue";
import TargetWordsContainer from "../target_words/target_words_container";
import GameOver from "../game_over/game_over";
import Scoreboard from "../scoreboard/scoreboard";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.mainMenu = this.mainMenu.bind(this);
  }

  mainMenu(event) {
    if (event !== undefined) {
      event.preventDefault();
    }
    window.location.reload();
  }

  render() {
    const { gameState, socket } = this.props;

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
              <CurrentClueContainer
                socket={socket}
                gameState={gameState}
              />
              <TileBankContainer
                socket={socket}
                gameState={gameState}
              />
              {gameState.over ? (
                <GameOver
                  socket={socket}
                  gameState={gameState}
                />
              ) : (
                <></>
              )}
            </div>
          )}
          <div className="bottom-container">
            <MyTargetWordContainer gameState={gameState} />
            <Scoreboard
              over={gameState.over}
              players={gameState.players}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
