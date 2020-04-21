import React from 'react';

class ClueContruction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clueConstructionArray: [
                {
                    "_id": "5e9dece5146f803a3a1bad10",
                    "black": "local",
                    "white": "fever",
                    "__v": 0
                },
                {
                    "_id": "5e9dece5146f803a3a1bad11",
                    "black": "motel",
                    "white": "issue",
                    "__v": 0
                },
            ], 
            currentColor: "black",
        }
    }

    render() {
        let currentColor = this.state.currentColor;
        let clueConstruction = this.state.clueConstructionArray.map(tile => {
            let tileSide = tile[currentColor];
            return (<li className={`color-${currentColor}`}
                        key={tile.id}>
                            {tileSide}
                    </li>)
        });

        return (<div className="clueConstruction"> 
            <h3>Clue Construction</h3>
            <ul>
                {clueConstruction}
            </ul>
        </div>)
    }

}

export default ClueContruction;