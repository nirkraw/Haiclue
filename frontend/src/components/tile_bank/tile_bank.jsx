import React from "react";
import ClueConstruction from "./clue_construction";
// import ReactCSSTransitionGroup from 'react-transition-group';
import Tile from "./tile";

class TileBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   currentTiles: [],
      currentColor: "black", // will be passed down to ClueConstruction
      selectedTiles: [], // will be passed down to ClueConstruction
    };
  }

  

  // this.game = {
  //     roomName: roomName,
  //     targetWords: [],
  //     players: {},
  //     gameStarted: false,
  //     currentColor: "black"
  //   };

  //   const player = {
  //   handle: handle,
  //   socketId: socketId,
  //   joined: false,
  //   number: 0, // default value
  //   targetWord: "",
  //   clueTiles: [],
  //   selectedClueTiles: []
  // };

  render() {
    const { gameState } = this.props;
    if (!gameState) return null;

    const player = Object.values(this.props.gameState.players).filter(
      (player) => {
        return player.handle === this.props.user.handle;
      }
    )[0];

    let tiles = player.clueTiles;

    let newTiles = tiles.map((tile) => {
      return (
        <Tile
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
      <div className="bankAndClueConstructContainer">
        <div className="clueConstructionContainer">
          <ClueConstruction
            clueConstructionArray={player.selectedClueTiles}
            // toggleTile={this.toggleTile}
            // currentColor={currentColor}
          />
        </div>

        <div className="tileBankContainer">
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

// this.state = {
//             currentTiles: [
//                 {
//                     "_id": "5e9dece5146f803a3a1bad32",
//                     "black": "random",
//                     "white": "star",
//                     "__v": 0,
//                     display: true,
//                 },
//                 {
//                     "_id": "5e9dece5146f803a3a1bad31",
//                     "black": "subject",
//                     "white": "miracle",
//                     "__v": 0,
//                     display: true,
//                 },
//                 {
//                     "_id": "5e9dece5146f803a3a1bad33",
//                     "black": "cast",
//                     "white": "destiny",
//                     "__v": 0,
//                     display: true
//                 },
//                 {
//                     "_id": "5e9dece5146f803a3a1bad35",
//                     "black": "uniform",
//                     "white": "alien",
//                     "__v": 0,
//                     display: true
//                 },
//                 {
//                     "_id": "5e9dece5146f803a3a1bad34",
//                     "black": "blast",
//                     "white": "adult",
//                     "__v": 0,
//                     display: true
//                 },
//                 {
//                     "_id": "5e9dece5146f803a3a1bad36",
//                     "black": "flower",
//                     "white": "shed",
//                     "__v": 0,
//                     display: true
//                 },
//                 {
//                     "_id": "5e9dece5146f803a3a1bad37",
//                     "black": "union",
//                     "white": "swell",
//                     "__v": 0,
//                     display: true
//                 },
//                 {
//                     "_id": "5e9dece5146f803a3a1bad39",
//                     "black": "cruel",
//                     "white": "lousy",
//                     "__v": 0,
//                     display: true
//                 },
//                 {
//                     "_id": "5e9dece5146f803a3a1bad38",
//                     "black": "fallen",
//                     "white": "wrist",
//                     "__v": 0,
//                     display: true
//                 },
//                 {
//                     "_id": "5e9dece5146f803a3a1bad3a",
//                     "black": "agreed",
//                     "white": "capture",
//                     "__v": 0,
//                     display: true
//                 },
//                 {
//                     "_id": "5e9dece5146f803a3a1bad3b",
//                     "black": "justice",
//                     "white": "island",
//                     "__v": 0,
//                     display: true
//                 },
//                 {
//                     "_id": "5e9dece5146f803a3a1bad3c",
//                     "black": "charity",
//                     "white": "bishop",
//                     "__v": 0,
//                     display: true
//                 },
//                 {
//                     "_id": "5e9dece5146f803a3a1bad40",
//                     "black": "pin",
//                     "white": "burn",
//                     "__v": 0,
//                     display: true
//                 },
//                 {
//                     "_id": "5e9dece5146f803a3a1bad3d",
//                     "black": "form",
//                     "white": "battery",
//                     "__v": 0,
//                     display: true
//                 },
//                 {
//                     "_id": "5e9dece5146f803a3a1bad3e",
//                     "black": "history",
//                     "white": "finish",
//                     "__v": 0,
//                     display: true
//                 }
