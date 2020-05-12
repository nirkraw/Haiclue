import React from 'react';
import '../css/scoreboard.css';

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
        let players = Object.values(this.state).map( (player, index) => {
        return (<div key={index}>
                    <div className="points-div">{player.points}</div>
                    <div className="handle-div">{player.handle}</div>
                </div>)
        });
        return (<div className="scoreboard-container">
            <h3>Score</h3>
                {players}
        </div>)
    }
}

export default ScoreBoard; 