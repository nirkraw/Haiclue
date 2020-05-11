// import React from "react";
// import ClueConstruction from "./clue_construction";
// // import ReactCSSTransitionGroup from 'react-transition-group';
// import Tile from "./tile";

// class TileBank extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       //   currentTiles: [],
//       currentColor: "black", // will be passed down to ClueConstruction
//       selectedTiles: [], // will be passed down to ClueConstruction
//     };

//     this.addTileToClue = this.addTileToClue.bind(this);
//     this.removeTileFromClue = this.removeTileFromClue.bind(this);
//     this.toggleTile = this.toggleTile.bind(this);
//   }

//   addTileToClue(tile) {
//     let newSelectedTiles = this.state.selectedTiles.concat(tile);
//     this.setState({ selectedTiles: newSelectedTiles });
//   }

//   removeTileFromClue(tile) {
//     let newSelectedTiles = this.state.selectedTiles.filter(
//       (otherTile) => otherTile !== tile
//     );
//     this.setState({ selectedTiles: newSelectedTiles });
//   }

//   // toggleTile(e, type) {

//   //     let otherTiles = this.state.currentTiles.filter(tile => tile[this.state.currentColor] !== e.currentTarget.innerText);
//   //     let tile = this.state.currentTiles.filter(tile => tile[this.state.currentColor] === e.currentTarget.innerText)[0];
//   //     tile.display = !tile.display;

//   //     let newCurrentTiles = otherTiles.concat(tile);

//   //     let callback = (type === 'bank') ? this.addTileToClue : this.removeTileFromClue;
//   //     this.setState({ CurrentTiles: newCurrentTiles }, callback(tile));
//   // }

//   toggleTile(e, type) {
//     const { gameState } = this.props;
//     const { currentColor } = this.state;

//     const player = Object.values(gameState.players).filter((player) => {
//       return player.handle === this.props.user.handle;
//     });
//     let tiles = player[0].clueTiles;

//     let otherTiles = tiles.filter(
//       //   (tile) => tile.currentColor !== e.currentTarget.innerText
//       (tile) => tile[currentColor] !== e.currentTarget.innerText
//     );
//     let tile = tiles.filter(
//       (tile) => tile[currentColor] === e.currentTarget.innerText
//     )[0];
//     tile.display = !tile.display;

//     let newCurrentTiles = otherTiles.concat(tile);

//     let callback =
//       type === "bank" ? this.addTileToClue : this.removeTileFromClue;
//     tiles = newCurrentTiles;
//     callback(tile);
//   }


//   render() {
//     const { gameState } = this.props;
//     if (!gameState) return null;

//     const player = Object.values(this.props.gameState.players).filter(
//       (player) => {
//         return player.handle === this.props.user.handle;
//       }
//     );

//     let tiles = player[0].clueTiles;
//     let currentColor = this.state.currentColor;
//     let toggleTile = this.toggleTile;

//     let filteredTiles = tiles.filter((tile) => {
//       // debugger
//       //    return !(this.state.selectedTiles.includes(tile))

//       let count = 0;
//       for (let i = 0; i < this.state.selectedTiles.length; i++) {
//         let selectedTile = this.state.selectedTiles[i];
//         if (selectedTile.id === tile.id) {
//           count++;
//         }
//       }
//       return count === 0;
//     });

//     debugger;
//     let newTiles = filteredTiles.map((tile) => {
//       return (
//         <Tile
//           tile={tile}
//           currentColor={currentColor}
//           display={tile.display}
//           type="bank"
//           toggleTile={toggleTile}
//         />
//       );
//     });

//     return (
//       <div className="bankAndClueConstructContainer">
//         <div className="clueConstructionContainer">
//           <ClueConstruction
//             clueConstructionArray={this.state.selectedTiles}
//             toggleTile={this.toggleTile}
//             currentColor={currentColor}
//           />
//         </div>

//         <div className="tileBankContainer">
//           <h3>Tilebank</h3>
//           {/* <ReactCSSTransitionGroup
//                         transitionName="tiles"
//                         transitionEnterTimeout={500}
//                         transitionLeaveTimeout={300}> */}
//           {newTiles}
//           {/* </ReactCSSTransitionGroup>  */}
//         </div>
//       </div>
//     );
//   }
// }

// export default TileBank;

// // this.state = {
// //             currentTiles: [
// //                 {
// //                     "_id": "5e9dece5146f803a3a1bad32",
// //                     "black": "random",
// //                     "white": "star",
// //                     "__v": 0,
// //                     display: true,
// //                 },
// //                 {
// //                     "_id": "5e9dece5146f803a3a1bad31",
// //                     "black": "subject",
// //                     "white": "miracle",
// //                     "__v": 0,
// //                     display: true,
// //                 },
// //                 {
// //                     "_id": "5e9dece5146f803a3a1bad33",
// //                     "black": "cast",
// //                     "white": "destiny",
// //                     "__v": 0,
// //                     display: true
// //                 },
// //                 {
// //                     "_id": "5e9dece5146f803a3a1bad35",
// //                     "black": "uniform",
// //                     "white": "alien",
// //                     "__v": 0,
// //                     display: true
// //                 },
// //                 {
// //                     "_id": "5e9dece5146f803a3a1bad34",
// //                     "black": "blast",
// //                     "white": "adult",
// //                     "__v": 0,
// //                     display: true
// //                 },
// //                 {
// //                     "_id": "5e9dece5146f803a3a1bad36",
// //                     "black": "flower",
// //                     "white": "shed",
// //                     "__v": 0,
// //                     display: true
// //                 },
// //                 {
// //                     "_id": "5e9dece5146f803a3a1bad37",
// //                     "black": "union",
// //                     "white": "swell",
// //                     "__v": 0,
// //                     display: true
// //                 },
// //                 {
// //                     "_id": "5e9dece5146f803a3a1bad39",
// //                     "black": "cruel",
// //                     "white": "lousy",
// //                     "__v": 0,
// //                     display: true
// //                 },
// //                 {
// //                     "_id": "5e9dece5146f803a3a1bad38",
// //                     "black": "fallen",
// //                     "white": "wrist",
// //                     "__v": 0,
// //                     display: true
// //                 },
// //                 {
// //                     "_id": "5e9dece5146f803a3a1bad3a",
// //                     "black": "agreed",
// //                     "white": "capture",
// //                     "__v": 0,
// //                     display: true
// //                 },
// //                 {
// //                     "_id": "5e9dece5146f803a3a1bad3b",
// //                     "black": "justice",
// //                     "white": "island",
// //                     "__v": 0,
// //                     display: true
// //                 },
// //                 {
// //                     "_id": "5e9dece5146f803a3a1bad3c",
// //                     "black": "charity",
// //                     "white": "bishop",
// //                     "__v": 0,
// //                     display: true
// //                 },
// //                 {
// //                     "_id": "5e9dece5146f803a3a1bad40",
// //                     "black": "pin",
// //                     "white": "burn",
// //                     "__v": 0,
// //                     display: true
// //                 },
// //                 {
// //                     "_id": "5e9dece5146f803a3a1bad3d",
// //                     "black": "form",
// //                     "white": "battery",
// //                     "__v": 0,
// //                     display: true
// //                 },
// //                 {
// //                     "_id": "5e9dece5146f803a3a1bad3e",
// //                     "black": "history",
// //                     "white": "finish",
// //                     "__v": 0,
// //                     display: true
// //                 }
