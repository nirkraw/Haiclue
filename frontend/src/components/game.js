import React from "react";
import MyTargetWordContainer from "./my_target_word/my_target_word_container";
import TileBank from "./tile_bank/tile_bank";
import CurrentClue from "./current_clue/current_clue";
import TargetWordsContainer from "./target_words/target_words_container";

const Game = (props) => (
  <div>
    {props.loggedIn ? <button onClick={props.logout}>Logout</button> : null}

    <h1 className="logo">Haiclue!</h1>
    <div className="gameContainer">
      <div className="topContainer">
        <CurrentClue />
        <TargetWordsContainer
          gameState={props.gameState}
          socket={props.socket}
        />
      </div>
      <div className="bottomContainer">
        <MyTargetWordContainer gameState={props.gameState} />
        <TileBank />
      </div>
    </div>
  </div>
);

export default Game;
