import React from 'react';

class GameOver extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
        this.sortByPoints = this.sortByPoints.bind(this)
    }

    sortByPoints(player1, player2) {
        // list.sort((a, b) => (a.color > b.color) ? 1 : (a.color === b.color) ? ((a.size > b.size) ? 1 : -1) : -1 )
        return Math.sign(player2.points - player1.points)
        // list.sort((a, b) => (a.points > b.points) ? 1 : (a.color === b.color) ? ((a.size > b.size) ? 1 : -1) : -1 )
    }



    render() {
        // this.props.gameState.players
        // .points
        // .handle
        const playersArray = Object.values(this.props.gameState.players).sort(this.sortByPoints);
        //sortByPoints(playersArray)

        const scores = playersArray.map((player, idx) => {
            return (<li key={idx}> {player.handle} : {player.points} </li>)
        })

        // debugger
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
