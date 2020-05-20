import React from "react";
import ClueConstruction from "./clue_construction";
import Tile from "./tile";
import '../css/tile_bank.css';


class TileBank extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { gameState } = this.props;
    if (!gameState) return null;

    if(gameState.over) return (<></>)

    const player = Object.values(this.props.gameState.players).filter(
      (player) => {
        // return player.handle === this.props.user.handle;
        return player.socketId === this.props.socket.id;
      }
    )[0];

    const tiles = player.clueTiles;
    
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

    if (gameState.phase === "clue construction") {      
      if (!player.submittedClue) {
        return (
          <div className="clue-bank-container">
            <div className="clue-container">
                <ClueConstruction
                  timer = {gameState.timer}
                  clueConstructionArray={player.selectedClueTiles}
                  roomName={gameState.roomName}
                  socket={this.props.socket}
                  player={player}
                  currentColor={gameState.currentColor}
                  type="bank"
                  />
            </div>
            <div className="bank-container">
              {newTiles}
            </div>
          </div>
        );
      } else {
          return <h1>Waiting for other players</h1>
      }
    } else {
        return null;
    }
  }
}
export default TileBank;