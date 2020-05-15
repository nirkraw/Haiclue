import React from 'react';
import '../css/scoreboard.css';

class ScoreBoard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.over) return (<></>)    
        let players = Object.values(this.props.players).map( (player, index) => {
        return (<div key={index} className='wrapper'>
                    { (player.submitedGuess) 
                    ? <div className="check">&#10004;</div>
                    : <div className="empty-div"></div>
                    }   
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