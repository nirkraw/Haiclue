import React from 'react';
import '../css/game_over.css';

class GameOver extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
        this.sortByPoints = this.sortByPoints.bind(this)
    }

    sortByPoints(player1, player2) {
        return Math.sign(player2.points - player1.points)
    }

    render() {
        const playersArray = Object.values(this.props.gameState.players).sort(this.sortByPoints);
        
        const scores = playersArray.map((player, idx) => {
            return (<li key={idx}> {player.handle} <span className='points color-blue'> {player.points}</span> </li>)
        })
        /// needs more logic to handle ties
        return (
            <div className='game-over-container'>
                <h1 className='color-yellow game-over'>GAME OVER</h1>
                <h1>{playersArray[0].handle} wins!</h1>
                <ul>{scores}</ul>
            </div>
        )
    }
}
export default GameOver;
