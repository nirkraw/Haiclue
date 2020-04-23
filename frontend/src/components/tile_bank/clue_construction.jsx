import React from 'react';
import '../css/layout.css';

class ClueContruction extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        // debugger; 
        let currentColor = this.props.currentColor;
        // debugger; 
        let clueConstruction = this.props.clueConstructionArray.map(tile => {
            return (<div className={`color-${currentColor} tile`}>
                            {tile}
                    </div>)
        });

        return (<div> 
            <h3>Clue Construction</h3>
                {clueConstruction}
        </div>)
    }

}

export default ClueContruction;