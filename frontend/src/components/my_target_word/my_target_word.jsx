import React from "react";
import "../css/layout.css";
import green from "../images/green-tile.png";

class MyTargetWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "#",
      // maybe this component needs to be passed props from TargetWords instead of its own container
      // to get the associated card
    };
    this.getWord = this.getWord.bind(this);
  }

  getWord() {
    const player = Object.values(this.props.gameState.players).filter(
      (player) => {
        return player.handle === this.props.user.handle;
      }
    );

       return player[0].targetWord.black // probably has to change on flipped tile
  }

  render() {
    if (!this.props.gameState) return null;
    //come up with logic to switch picture with the right word 
    return (
      <div className="myTargetWordContainer">
        <h3>My Target Word</h3>
        <img src={green} className="myTargetWordImg" alt="green" /> 
        <div className="myTargetWord tile">{this.getWord()}</div>
      </div>
    );
  }
}

export default MyTargetWord;
