import React from 'react';
import '../css/scoreboard.css';

class ScoreBoard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let players = Object.values(this.props.players).map( (player, index) => {
        return (<div key={index} className='wrapper'>
                    <div className="points-div">{player.points}</div>
                    <div className="handle-div">{player.handle}</div>
                </div>)
        });
        return (<div className="scoreboard-container">
                {players}
        </div>)
    }
}

export default ScoreBoard; 