import React from 'react';
import Scoreboard from './scoreboard';
import '../css/layout.css';
import blue from '../images/blue-tile.png';
import red from '../images/red-tile.png';
import green from '../images/green-tile.png';
import yellow from '../images/yellow-tile.png';


class TargetWords extends React.Component {
    constructor(props){ // fetechTiles, fetchPlayers, fetchGame, tiles (array)
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

  }

 componentDidMount() {
    //  debugger;
     this.props.fetchTiles();
 }



  selectTargetWords() {
    const {roomName} = this.props
    let targetWords = this.props.tiles.slice(60);
    // debugger;
    this.props.socket.emit("target words", roomName, targetWords); 
  }

    render() {

        if (this.props.gameState && this.props.gameState.gameStarted) {
            this.selectTargetWords();
        } 
        const {gameState} = this.props;
        let targetWords; 
        if(gameState) {
            targetWords = gameState.targetWords 
        } 
        if (!targetWords) return null;
        // debugger; 
        
        let selectorTri = (<svg width="100%" height="80px" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M -200 100 L 600 100 L 200 300 z"
            fill="white"
            stroke="white"
            stroke-width="3" />
        </svg>);


        let cards = [ {blue: blue}, {red: red}, {green: green}, {yellow: yellow}];
        let currentColor = this.state.currentColor;
        // let targetWords = this.state.targetWords.map((tile, index) => {
        targetWords.map((tile, index) => {
        let tileSide = tile[currentColor]; 
            return (<div className="targetWordContainer">
                            <img src={Object.values(cards[index])} className="targetImg" alt={Object.keys(cards[index])}/>
                            <div className={`color-${currentColor} tile`}>{tileSide}</div>
                    </div>)
        });

        return (
            <div className="targetScoreContainer">
                <div className="targetWordsContainer" >
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