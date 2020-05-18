import React from "react";

class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.clueSubmit = this.clueSubmit.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  clueSubmit(event) {
    const { roomName, player, tile } = this.props;
    event.preventDefault();
    if (player.clueTiles.includes(tile)) {
      this.props.socket.emit("select clue tile",roomName, player.handle, tile);
    } else {
      this.props.socket.emit("remove clue tile", roomName, player.handle, tile);
    }

    const sound = document.getElementById("tile-sound");
    sound.currentTime = 0;
    sound.volume = .35;
    sound.play();
  }

  playSound() {
    const sound = document.getElementById("tile-sound");
    sound.currentTime = 0;
    sound.volume = .35;
    sound.play();
  }



  render() {
    let currentColor = this.props.currentColor;
    let tileWord = this.props.tile[currentColor];

    if(this.props.phase === "clue guessing") {
      return (
        <>
        {this.props.display ? (
          <div
           className={`color-${currentColor} tile`}
           onClick={this.playSound}
          >
            {tileWord}
          </div>
        ) : (
          <div className="emptyTileSpace">{null}</div>
        )}
      </>
      )
    } else {
      return (
        <>
          {this.props.display ? (
            <div
              className={`color-${currentColor} tile hoverable flip`}
              onClick={this.clueSubmit}
            >
              {tileWord}
            </div>
          ) : (
            <div className="emptyTileSpace">{null}</div>
          )}
        </>
      );
    }
  }
}

export default Tile;
