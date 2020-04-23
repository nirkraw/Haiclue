import React from 'react';
import Scoreboard from './scoreboard';
import '../css/layout.css';
import blue from '../images/blue-tile.png';
import red from '../images/red-tile.png';
import green from '../images/green-tile.png';
import yellow from '../images/yellow-tile.png';

class TargetWords extends React.Component {
    constructor(props){ // fetchTiles, fetchPlayers, fetchGame, tiles (array)
        super(props)
        this.state = {
            targetWords: [{
                    "_id": "5e9deccab0fb6a39f7219f8d",
                    "black": "oil",
                    "white": "brains",
                    "__v": 0
                },
                {
                    "_id": "5e9deccab0fb6a39f7219f8a",
                    "black": "flat",
                    "white": "spy",
                    "__v": 0
                },
                {
                    "_id": "5e9deccab0fb6a39f7219f8e",
                    "black": "bump",
                    "white": "radio",
                    "__v": 0
                },
                {
                    "_id": "5e9deccab0fb6a39f7219f8b",
                    "black": "horn",
                    "white": "badge",
                    "__v": 0
                }
            ], 
            currentColor: "black"
        }

    this.selectTargetWords = this.selectTargetWords.bind(this);
    this.makeGuess = this.makeGuess.bind(this);
    this.checkGuessedWord = this.checkGuessedWord.bind(this);
  }

    componentDidMount() {
        // this.props.fetchTiles()
        // this.props.fetchPlayers() // fetches players slice of state
        // this.this.props.fetchGame() // fetches game slice of state
    }

  selectTargetWords() {
    // figure out best place to call this
    this.setState({ targetWords: this.props.tiles.slice(60) }); // keep an eye for this
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
  makeGuess() {}

  checkGuessedWord() {}

  checkSubmittedGuesses() {
    ///
    // `this.props.player${this.props.sessionId}.submitted`
    
    if(
      this.props.playerOne.submitted &&
      this.props.PlayerTwo.submitted &&
      this.props.playerThree.submitted &&
      this.props.PlayerFour.submitted
    ) {
      startnexround()
    }
  }
// if(
//   this.props.players.forEach(player) => {
//    if player.submitted === false {
//      return false 
//    }
//   }
// )

    checkSubmittedGuesses() {
        return (
        this.props.playerOne.submitted && 
        this.props.PlayerTwo.submitted &&
        this.props.playerThree.submitted && 
        this.props.PlayerFour.submitted
    )}

    render() {

        let cards = [ {blue: blue}, {red: red}, {green: green}, {yellow: yellow}];
        let currentColor = this.state.currentColor;
        let targetWords = this.state.targetWords.map((tile, index) => {
            let tileSide = tile[currentColor]; 
            return (<div className="targetWordContainer">
                            <img src={Object.values(cards[index])} className="targetImg" alt={Object.keys(cards[index])}/>
                            <div className={`color-${currentColor} tile`}>{tileSide}</div>

                    </div>)
        });

        return (
            <div className="targetScoreContainer">
                < div className="targetWordsContainer" >
                <h3>Target Words</h3>
                    {targetWords}
                </div>
                <Scoreboard 
                    // playerOne={this.props.playerOne}
                    // playerTwo={this.props.playerTwo}
                    // playerThree={this.props.playerThree}
                    // playerFour={this.props.playerFour}
                    // takes in as props, the guess from target words
                />
            </div>
        )
    }
}


export default TargetWords;