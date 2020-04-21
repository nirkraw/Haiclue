import React from 'react';

class ScoreBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props; 
    }

    render() {
        return (<div className="scoreboardContainer">
            <ul>
                <li>{this.state.playerOne.handle}
                    <span className="points">{this.state.playerOne.points}</span>
                </li>
                <li>{this.state.playerTwo.handle}
                    <span className="points">{this.state.playerTwo.points}</span>
                </li>
                <li>{this.state.playerThree.handle}
                    <span className="points">{this.state.playerThree.points}</span>
                </li>
                <li>{this.state.playerFour.handle}
                    <span className="points">{this.state.playerFour.points}</span>
                </li>
            </ul>
        </div>)
    }
}

export default ScoreBoard; 