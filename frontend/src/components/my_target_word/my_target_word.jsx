import React from "react";
import "../css/layout.css";
import blue from "../images/blue-tile.png";
import red from "../images/red-tile.png";
import green from "../images/green-tile.png";
import yellow from "../images/yellow-tile.png";

class MyTargetWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  
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
    let cards = [
      blue,
      red,
      green,
      yellow,
    ];

    if (!this.props.gameState) return null;
    let myWord = this.getWord()
    let picNumber
    for (let i = 0; i < 4; i++) {
      if ((this.props.gameState.targetWords[i].black === myWord) || (this.props.gameState.targetWords[i].black === myWord)) 
      { picNumber = i}
    }
    return (
      <div className="myTargetWordContainer">
        <h3>My Target Word</h3>
        <img src={cards[picNumber]} className="myTargetWordImg" alt="green" /> 
        <div className="myTargetWord tile">{myWord}</div>
      </div>
    );
  }
}

export default MyTargetWord;
