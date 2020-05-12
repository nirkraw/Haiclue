import React from "react";
import MyTargetWordContainer from "../my_target_word/my_target_word_container";
import TileBankContainer from "../tile_bank/tile_bank_container";
import CurrentClue from "../current_clue/current_clue";
import TargetWordsContainer from "../target_words/target_words_container";
import Logout from '../global/logout-instructions-button';


const Game = (props) => (
  <div>
      <Logout logout={props.logout} loggedIn={props.loggedIn} />

      <h1 className="logo">Haiclue</h1>
      <div className="game-container">
      <div className="top-container">
        <CurrentClue />
        <TargetWordsContainer gameState={props.gameState} />
      </div>
      <div className="bottom-container">
        <MyTargetWordContainer gameState={props.gameState} />
        <TileBankContainer socket={props.socket} gameState={props.gameState} />
      </div>
    </div>
  </div>
);

export default Game;
