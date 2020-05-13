import React from 'react';

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
            return (<li key={idx}> {player.handle} : {player.points} </li>)
        })

        return (
            <div>
                <h1>GAME OVER</h1>
                <h2>{playersArray[0].handle} wins!</h2>
                <ul>{scores}</ul>
            </div>
        )
    }
}
export default GameOver;
