import React from "react";
import MyTargetWordContainer from "../my_target_word/my_target_word_container";
import TileBankContainer from "../tile_bank/tile_bank_container";
import CurrentClue from "../current_clue/current_clue";
import TargetWordsContainer from "../target_words/target_words_container";
import '../css/index.css';

const Game = (props) => (
  <div>
    <div className="logout-button">
      {props.loggedIn ? (
        <button className="tile" onClick={props.logout}>
          Logout
        </button>
      ) : null}
    </div>

    <h1 className="logo">Haiclue</h1>
    <div className="gameContainer">

      <div className="topContainer">
        <CurrentClue gameState={props.gameState} />
        <TargetWordsContainer gameState={props.gameState} />
      </div>

      <div className="bottomContainer">
        <MyTargetWordContainer gameState={props.gameState} />
        <TileBankContainer socket={props.socket} gameState={props.gameState} />
      </div>
    </div>
  </div>
);

export default Game;
