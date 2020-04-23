import React from 'react';
import '../css/layout.css';
import Timer from '../timer/timer';
import Tile from './tile';


class ClueContruction extends React.Component {
    constructor(props) {
        super(props)
        this.submitConstructedClue = this.submitConstructedClue.bind(this);
    }

    submitConstructedClue() { // submit when timer runs out
    }

    render() {
        let currentColor = this.props.currentColor;
        let toggleTile = this.props.toggleTile;
        let clueConstruction = this.props.clueConstructionArray.map(tile => {
            return (<Tile 
                            currentColor={currentColor}
                            toggleTile={toggleTile}
                            tile={tile}
                            display={true}
                            type="clue"
                    />)
        });

        return (<div> 
            <h3>Clue Construction</h3>
                {clueConstruction}
            <div><Timer timer='50' /></div>
        </div>)
    }
}

export default ClueContruction;