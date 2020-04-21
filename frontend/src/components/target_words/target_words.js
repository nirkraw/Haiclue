import React, { Component } from 'react';
import Scoreboard from './scoreboard';


export default class TargetWords extends Component {
    constructor(props){// fetchTiles, fetchPlayers, fetchGame, tiles (array)
        super(props)
        this.state = {targetWords: []}

        this.selectTargetWords = this.selectTargetWords.bind(this);
        this.makeGuess = this.makeGuess.bind(this);
        this.checkGuessedWord = this.checkGuessedWord.bind(this);
    }

    componentDidMount() {
        this.props.fetchTiles()
        this.props.fetchPlayers() // fetches players slice of state
        this.this.props.fetchGame() // fetches game slice of state
    }

    selectTargetWords() { // figure out best place to call this
        this.setState({targetWords: this.props.tiles.slice(60)});// keep an eye for this
    }


    //  playerOne: state.entities.players[0],
    //     playerTwo: state.entities.players[1],
    //     playerThree: state.entities.players[2],
    //     playerFour: state.entities.players[3]

    // user: { 

    //                     handle: "", 
    //                     points: 0, 
    //                     target_word: "", 
    //                     clue_array: [], 
    //                     submitted: false
    //                 } 
    makeGuess() {
        
    }
    
    checkGuessedWord() {

    }

    checkSubmittedGuesses() {
        return (
        this.props.playerOne.submitted && 
        this.props.PlayerTwo.submitted &&
        this.props.playerThree.submitted && 
        this.props.PlayerFour.submitted
    )}

    render() {
        return (
            <div>
                <Scoreboard 
                    playerOne={this.props.playerOne}
                    playerTwo={this.props.playerTwo}
                    playerThree={this.props.playerThree}
                    playerFour={this.props.playerFour}
                    // takes in as props, the guess from target words
                />
            </div>
        )
    }
}
