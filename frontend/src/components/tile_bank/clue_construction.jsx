import React from 'react';
import '../css/layout.css';
import Timer from '../timer/timer';
import Tile from './tile';

// Could be refactored into funcitonal component
const ClueContruction = (props) => {

        const {currentColor, player, roomName, socket} = props 
        let clueConstruction = props.clueConstructionArray.map(tile => {
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

export default ClueContruction;