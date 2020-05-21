import React from "react";
import "../css/scoreboard.css";
import thinking from "../images/thinking.png";
import glasses from "../images/glasses.png";

const ScoreBoard = (props) => {
  if (this.props.over) return null;
  let players = Object.values(this.props.players).map((player, index) => {
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
