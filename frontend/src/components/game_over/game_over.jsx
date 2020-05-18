import React from 'react';
import '../css/game_over.css';
import {NavLink} from 'react-router-dom';


class GameOver extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
        this.sortByPoints = this.sortByPoints.bind(this)
        this.playAgain = this.playAgain.bind(this);
        this.newRoom = this.newRoom.bind(this);
    }

    componentDidMount() {
        const sound = document.getElementById("game-over-sound");
        sound.volume = .4;
        sound.play();
    }

    sortByPoints(player1, player2) {
        return Math.sign(player2.points - player1.points)
    }

    playAgain() {
        this.props.socket.emit("play again", this.props.gameState.roomName);
    }

    newRoom() {
        window.location.reload();
    }

  
    render() {
        const playersArray = Object.values(this.props.gameState.players).sort(this.sortByPoints);
        
        const scores = playersArray.map((player, idx) => {
            return (<li key={idx}> {player.handle} <span className='points color-blue'> {player.points}</span> </li>)
        })
        let tie = [playersArray[0].handle]
        for (let i = 1; i < playersArray.length; i++) {
             if (playersArray[i].points === playersArray[i-1].points) {
                 tie.push(playersArray[i].handle)
             }
        }
        const winner = (
            (tie.length > 1) 
            ? <h1>{tie.slice(0, tie.length - 1).join(", ")} and {tie[tie.length - 1]} tie!</h1>
            : <h1>{playersArray[0].handle} wins!</h1> 
        )
       
        /// needs more logic to handle ties
        return (
            <div className='game-over-container'>
                <h1 className='color-yellow game-over'>GAME OVER</h1>
                {winner}
                {/* <h1>{playersArray[0].handle} wins!</h1> */}
                <ul>{scores}</ul>
                <div className="game-over-buttons">
                    <button onClick={this.playAgain} className='game-over-button'>Play Again!</button>
                    <button onClick={this.newRoom} className='game-over-button'>New Room</button>
                </div>
            </div>
        )
    }
}
export default GameOver;
