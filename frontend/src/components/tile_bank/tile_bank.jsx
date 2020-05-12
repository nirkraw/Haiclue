import React from "react";
import ClueConstruction from "./clue_construction";
// import ReactCSSTransitionGroup from 'react-transition-group';
import Tile from "./tile";
import '../css/tile_bank.css';

// Could be refactored into funcitonal component
class TileBank extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { gameState } = this.props;
    if (!gameState) return null;

    const player = Object.values(this.props.gameState.players).filter(
      (player) => {
        return player.handle === this.props.user.handle;
      }
    )[0];

    let tiles = player.clueTiles;

    let newTiles = tiles.map((tile, index) => {
      return (
        <Tile
          key={index}
          roomName={gameState.roomName}
          socket={this.props.socket}
          player={player}
          tile={tile}
          currentColor={gameState.currentColor}
          display={tile.display}
          type="bank"
        />
      );
    });

    return (
      <div className="clue-bank-container">
        <div className="clue-container">
          <ClueConstruction
            clueConstructionArray={player.selectedClueTiles}
            roomName={gameState.roomName}
            socket={this.props.socket}
            player={player}
            currentColor={gameState.currentColor}
            type="bank"
          />
        </div>

        <div className="bank-container">
          <h3>Tilebank</h3>
          {/* <ReactCSSTransitionGroup
                        transitionName="tiles"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}> */}
          {newTiles}
          {/* </ReactCSSTransitionGroup>  */}
        </div>
      </div>
    );
  }
}

export default TileBank;