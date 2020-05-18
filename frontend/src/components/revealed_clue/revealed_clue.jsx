import React, { Component } from 'react'
import blue from "../images/blue-tile.png";
import red from "../images/red-tile.png";
import green from "../images/green-tile.png";
import yellow from "../images/yellow-tile.png";
import '../css/revealed-clue.css';
export default class RevealedClue extends Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        const cards = {
            0: blue,
            1: red,
            2: green,
            3: yellow
        }

        const {gameState} = this.props;

        if(!gameState) return null;

        const players = Object.values(gameState.players);

        let playerHandle;
        let playerTargetWord;
        let playerTargetIndex;
        // let otherPlayers = [];

        for (let index = 0; index < players.length; index++) {
            let player = players[index];

            if(player.revealedClue) {
                playerHandle = player.handle;
                playerTargetWord = player.correctWord;
                playerTargetIndex = player.correctIndex;
            }
            // if (player.number === gameState.currentPlayerTurn) {
            //     debugger 
            //     otherPlayers.push(player);
            // }
        }
        // console.log(otherPlayers);

        const otherPlayersGuesses = players.map((player, idx) => {
            let x = gameState.currentPlayerTurn - 1
            if (x === 0) {
                x = players.length
            }

            if (player.number !== x) {
                debugger
                return (
                <li key={idx} >{player.handle}'s guess was {player.guessedWord}</li>
                )
            }
            // setTimeout( , 3000)
        })

    

        if (playerTargetWord) {
            return(
            <>
                <h1 className='revealed-clue-text'>{playerHandle}'s word was {playerTargetWord}!</h1>
                <img src={cards[playerTargetIndex]} className="revealed-clue-img " alt="green" /> 
                <ul className='player-guesses'>{otherPlayersGuesses}</ul>
            </>
            )
        } else {
            return null;
        }
    }
}
