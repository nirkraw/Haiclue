//wh
import React, {useContext} from "react";
import "../css/scoreboard.css";
import thinking from "../images/thinking.png";
import glasses from "../images/glasses.png";

//wh
import {MyContext} from "../game/game"

const ScoreBoard = (props) => {
  //wh
  const newPlayers = useContext(MyContext).players 
  if (props.over) return null;
  let players = Object.values(newPlayers).map((player, index) => {
    return (
      <div key={index} className="wrapper">
        {player.submittedClue ? (
          <img className="emoji" src={glasses} alt="glasses" />
        ) : (
          <img className="emoji" src={thinking} alt="thinking" />
        )}
        <div className="points-div">{player.points}</div>
        <div className="handle-div">{player.handle}</div>
      </div>
    );
  });
  return <div className="scoreboard-container">{players}</div>;
};

export default ScoreBoard;
