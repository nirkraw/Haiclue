import React from 'react';
import '../css/layout.css';
import '../css/current_clue.css';
import Tile from '../tile_bank/tile';
import Timer from '../timer/timer';

class CurrentClue extends React.Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        const {gameState} = this.props
        if (!gameState) return null;
        
        if(gameState.over) {
            return (
              <div>
                
              </div>
            )
        }


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
            if (typeof tile === 'string') {
                return (
                    <br key={index*1000}/>
                )
              }
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

            let selectorTri = (
                <svg
                    width="100%"
                    height="80px"
                    viewBox="0 0 400 400"
                    xmlns="http://www.w3.org/2000/svg"
                    className='selector-tri'
                >
                    <path
                        d="M -200 100 L 600 100 L 200 300 z"
                        fill="white"
                        stroke="rgb(70, 70, 70)"
                    />
                </svg>
            );

            if (gameState.phase === "clue guessing" && localPlayer.handle !== currentPlayer.handle && !localPlayer.submitedGuess) {
                return(
                    <div className="currentClue">
                        <div>
                            <Timer
                                timer = {gameState.timer}
                                phase={'submit guess'}
                                secs={30}
                                socket={this.props.socket}
                                roomName={gameState.roomName}
                                localPlayerHandle={localPlayer.handle}
                                currentPlayerHandle={currentPlayer.handle}
                            />
                        </div>
                        {selectorTri}
                        <h1>Guess {currentPlayer.handle}'s Clue!</h1>
                        {currentClue}
                    </div>
            )
            } else if (gameState.phase === "clue guessing" && localPlayer.handle === currentPlayer.handle){
                return (
                    <div className="currentClue">
                        <h1>Your clue is being guessed!</h1>
                        {currentClue}
                    </div>
                );
            } else if (gameState.phase === "clue guessing" 
                       && localPlayer.handle !== currentPlayer.handle
                       && localPlayer.submitedGuess) {
                return (
                    <div className="currentClue">
                        <h1>Waiting for other players to guess!</h1>
                        {/* should show your own guess*/}
                    </div>)
            } else {
                return null;
            }
    }

}

export default CurrentClue; 
