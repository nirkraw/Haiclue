import React from 'react';
import '../css/layout.css';
import '../css/current_clue.css';
import Tile from '../tile_bank/tile';


class CurrentClue extends React.Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        const {gameState} = this.props
        if (!gameState) return null;
        
        const currentPlayer = Object.values(this.props.gameState.players).filter(
            (player) => {
                return player.number === gameState.currentPlayerTurn;
            }
        )[0];

        const localPlayer = Object.values(gameState.players).filter(
            (player) => {
                return player.handle === this.props.user.handle;
            }
        )[0];
            
        const tiles = currentPlayer.selectedClueTiles 
        const currentClue = tiles.map((tile, index) => {
            return (
                <Tile
                key={index}
                phase = {gameState.phase}
                tile={tile}
                currentColor={gameState.currentColor}
                display={tile.display}
                type="bank"
                />
                );
            });
            
            if (gameState.phase === "clue guessing" && localPlayer.handle !== currentPlayer.handle) {
                return(
                    <div className="currentClue">
                        <h1>Guess {currentPlayer.handle}'s Clue!</h1>
                        {currentClue}
                    </div>
            )
            } else if (gameState.phase === "clue guessing" && localPlayer.handle == currentPlayer.handle){
                return (
                    <div className="currentClue">
                        <h1>Your clue is being guessed!</h1>
                        {currentClue}
                    </div>
                );
            } else {
                return null;
            }
    }

}

export default CurrentClue; 





// import React from 'react';
// import '../css/layout.css';

// class CurrentClue extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             currentClueArray: [{
//                 "_id": "5e9dece5146f803a3a1bad05",
//                 "black": "monkey",
//                 "white": "modern",
//                 "__v": 0
//             },
//             {
//                 "_id": "5e9dece5146f803a3a1bad06",
//                 "black": "western",
//                 "white": "dope",
//                 "__v": 0
//             },
//             {
//                 "_id": "5e9dece5146f803a3a1bad07",
//                 "black": "inch",
//                 "white": "lawn",
//                 "__v": 0
//             },
//             ],
//             currentColor: "black",
//         }
//     }

//     // componentDidMount() {
//     //     this.props.fillCurrentClue
//     // } 
//     // eventually will get the clue array for the current player & sets state


//     render() {
//         let currentColor = this.state.currentColor;
//         let clueTiles = this.state.currentClueArray.map((tile, idx) => {
//             let tileSide = tile[currentColor]
//             return (<div key={idx} className={`color-${currentColor} tile`}>
//                             {tileSide}
//             </div>
//             )
//         });

//         return (<div className="currentClueContainer">
//             <h3>Current Clue</h3>

//                 {clueTiles}
//                 {/* <div><Timer timer='90' /></div> */}
//         </div>)
//     }

// }

// export default CurrentClue; 