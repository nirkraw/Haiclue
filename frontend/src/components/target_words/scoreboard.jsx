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

        let players = Object.values(this.state).map(player => {
        return (<div>
                    <span>{player.points}</span>
                    {player.handle}
                </div>)
        });

        return (<div className="scoreboardContainer">
            <h3>Score</h3>
                {players}
        </div>)
    }
}

export default ScoreBoard; 