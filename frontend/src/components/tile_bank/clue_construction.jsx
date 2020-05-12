import React from 'react';
import '../css/layout.css';
import Timer from '../timer/timer';
import Tile from './tile';

// Could be refactored into funcitonal component
class ClueContruction extends React.Component {
    constructor(props) {
        super(props)
        this.submitClue = this.submitClue.bind(this);
    }

    submitClue(e) {
        e.preventDefault();
        this.props.socket.emit("submit clue", this.props.roomName, this.props.player.handle, ); 
    }

    render() {
        const {currentColor, player, roomName, socket} = this.props 
        let clueConstruction = this.props.clueConstructionArray.map(tile => {
            return (
              <Tile
                key={tile._id}
                currentColor={currentColor}
                roomName={roomName}
                socket = {socket}
                player={player}
                tile={tile}
                display={true}
                type="clue"
              />
            );
        });

        return (<div> 
            <h3>Clue Construction</h3>
                {clueConstruction}
                <button onClick= {this.submitClue}>Submit</button>
            <div>
                <Timer 
                secs={20} 
                socket={this.props.socket}
                roomName={this.props.roomName}
                handle={this.props.player.handle}
                />
             </div>
        </div>)
    }
}

export default ClueContruction;