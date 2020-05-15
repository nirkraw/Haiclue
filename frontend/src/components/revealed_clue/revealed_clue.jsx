import React, { Component } from 'react'
import blue from "../images/blue-tile.png";
import red from "../images/red-tile.png";
import green from "../images/green-tile.png";
import yellow from "../images/yellow-tile.png";

export default class RevealedClue extends Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        // const cards = [
        //     blue,
        //     red,
        //     green,
        //     yellow,
        //   ];
        const cards = {
            0: blue,
            1: red,
            2: green,
            3: yellow
        }

        const {gameState} = this.props

        if(!gameState) return null;

        const players = Object.values(gameState.players);

        let playerHandle;
        let playerTargetWord;
        let playerTargetIndex;

        for (let index = 0; index < players.length; index++) {
            let player = players[index];

            if(player.revealedClue) {
                playerHandle = player.handle;
                playerTargetWord = player.correctWord;
                playerTargetIndex = player.correctIndex;
                debugger
            }
        }
        if (playerTargetWord) {
            return(
            <>
                <h1>{playerHandle}'s word was {playerTargetWord}!</h1>
                <img src={cards[playerTargetIndex]} className="<class name here>" alt="green" /> 
            </>
            )
        } else {
            return null;
        }
    }
}
