import React from 'react';

class ScoreBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playerOne: {
                handle: "player1",
                points: 0,
                target_word: "", 
                clue_array: [], 
                submitted: true
            }, 
            playerTwo :{
                handle: "player2",
                points: 3,
                target_word: "",
                clue_array: [],
                submitted: false
            }, 
            playerThree: {
                handle: "player3",
                points: 20,
                target_word: "",
                clue_array: [],
                submitted: false
            }, 
            playerFour: {
                handle: "player4",
                points: 1,
                target_word: "",
                clue_array: [],
                submitted: false
            }
        }; 
    }

    render() {
        return (<div className="scoreboardContainer">
            <h3>Scoreboard</h3>
            <ul>
                <li className="playerScore">
                    <span className="points">{this.state.playerOne.points}</span>
                    <br />
                    {this.state.playerOne.handle}
                </li>
                <li className="playerScore">
                    <span className="points">{this.state.playerTwo.points}</span>
                    <br />
                    {this.state.playerTwo.handle}
                </li>
                <li className="playerScore">
                    <span className="points">{this.state.playerThree.points}</span>
                    <br />
                    {this.state.playerThree.handle}
                </li>
                <li className="playerScore">
                    <span className="points">{this.state.playerFour.points}</span>
                    <br />
                    {this.state.playerFour.handle}
                </li>
            </ul>
        </div>)
    }
}

export default ScoreBoard; 