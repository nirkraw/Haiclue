import React, { Component } from 'react'

export default class RevealedClue extends Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        const {gameState, socket} = this.props

        if(!gameState) return null;

        const players = Object.values(gameState.players);

        let playerTargetWord;
        let playerHandle;

        for (let index = 0; index < players.length; index++) {
            let player = players[index];

            if(player.revealedClue) {
                playerHandle = player.handle;
                playerTargetWord = player.correctWord
                // debugger
                setTimeout(() => {
                    socket.emit("unreveal clue", gameState.roomName, player.handle)
                }, 5000);
            }
        }

        if (playerTargetWord) {
            return(
            <h1>{playerHandle}'s word was {playerTargetWord}!</h1>
            )
        } else {
            return null;
        }
    }
}
