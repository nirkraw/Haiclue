import React from "react";

class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.clueSubmit = this.clueSubmit.bind(this);
  }

  clueSubmit(event) {
    const {tile, player, roomName} = this.props;
    debugger
    event.preventDefault();
    if (player.clueTiles.includes(tile)) {
      this.props.socket.emit(
        "select clue tile",
        (roomName, player.handle, tile)
      );
    } else {
      this.props.socket.emit(
        "remove clue tile",
        (roomName, player.handle, tile)
      );
    }
  }


  render() {
    let currentColor = this.props.currentColor;
    let tileWord = this.props.tile[currentColor];
    return (
      <>
        {this.props.display ? (
          <div
            className={`color-${currentColor} tile`}
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

export default Tile;
