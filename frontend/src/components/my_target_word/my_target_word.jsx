import React from "react";
import blue from "../images/blue-tile.png";
import red from "../images/red-tile.png";
import green from "../images/green-tile.png";
import yellow from "../images/yellow-tile.png";
import "../css/layout.css";
import "../css/my_target_word.css";

class MyTargetWord extends React.Component {
  constructor(props) {
    super(props);
    this.getWord = this.getWord.bind(this);
  }

  getWord() {
    const { gameState, user } = this.props;
    if (!gameState) return null;

    const player = Object.values(gameState.players).filter((player) => {
      return player.handle === user.handle;
    })[0];

    const currentColor = gameState.currentColor;
    if (player.targetWord) {
      const targetWord = player.targetWord;
      return targetWord[currentColor];
    } else {
      return " ";
    }
  }

  render() {
    const cards = [blue, red, green, yellow];

    const { gameState } = this.props;
    if (!gameState) return null;

    if (gameState.over) return <></>;

    let myWord = this.getWord();
    let picNumber;
    for (let i = 0; i < 4; i++) {
      if (gameState.targetWords[i] === undefined) {
        this.props.logout(); //send me to splash
        window.location.reload();
      }

      if (gameState.targetWords[i][gameState.currentColor] === myWord) {
        picNumber = i;
      }
    }
    return (
      <div className="my-target-word-container">
        <img
          src={cards[picNumber]}
          className="my-target-word-img"
          alt="green"
        />
        <div className={`color-${gameState.currentColor} tile`}>{myWord}</div>
      </div>
    );
  }
}

export default MyTargetWord;
