import React from "react";
import debounce from "lodash/debounce";

class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.clueSubmit = this.clueSubmit.bind(this);
  }

  clueSubmit(event) {
    event.preventDefault();
    const { roomName, player, tile } = this.props;
    if (player.clueTiles.includes(tile)) {
      this.props.socket.emit("select clue tile", roomName, tile);
    } else {
      this.props.socket.emit("remove clue tile", roomName, tile);
    }

    const sound = document.getElementById("tile-sound");
    sound.currentTime = 0;
    sound.volume = 0.35;
    sound.play();
  }

  render() {
    let currentColor = this.props.currentColor;
    let tileWord = this.props.tile[currentColor];

    if (this.props.phase === "clue guessing") {
      return (
        <>
          {this.props.display ? (
            <div className={`color-${currentColor} tile`}>{tileWord}</div>
          ) : (
            <div className="emptyTileSpace">{null}</div>
          )}
        </>
      );
    } else {
      return (
        <>
          {this.props.display ? (
            <div
              className={`color-${currentColor} tile hoverable flip`}
              // onClick={this.clueSubmit}
              onClick={debounce(this.clueSubmit, 1500, { leading: true })}
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
