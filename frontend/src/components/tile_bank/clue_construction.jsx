import React from 'react';
import '../css/layout.css';
import Timer from '../timer/timer';
import Tile from './tile';


class ClueContruction extends React.Component {
    constructor(props) {
        super(props)
        
        // this.submitConstructedClue = this.submitConstructedClue.bind(this);
    }

    // submitConstructedClue() { // submit when timer runs out
    // }

    render() {
        debugger
        const {currentColor, player, roomName, socket} = this.props 
        let clueConstruction = this.props.clueConstructionArray.map(tile => {
            debugger
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
            <div><Timer timer='50' /></div>
        </div>)
    }
}

export default ClueContruction;