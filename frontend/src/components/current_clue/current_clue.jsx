import React from 'react';
import '../css/layout.css';

class CurrentClue extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentClueArray: [{
                "_id": "5e9dece5146f803a3a1bad05",
                "black": "monkey",
                "white": "modern",
                "__v": 0
            },
            {
                "_id": "5e9dece5146f803a3a1bad06",
                "black": "western",
                "white": "dope",
                "__v": 0
            },
            {
                "_id": "5e9dece5146f803a3a1bad07",
                "black": "inch",
                "white": "lawn",
                "__v": 0
            },
            ],
            currentColor: "black",
        }
    }

    // componentDidMount() {
    //     this.props.fillCurrentClue
    // } 
    // eventually will get the clue array for the current player & sets state


    render() {
        let currentColor = this.state.currentColor;
        let clueTiles = this.state.currentClueArray.map(tile => {
            let tileSide = tile[currentColor]
            return (<div className={`color-${currentColor} tile`}>
                            {tileSide}
            </div>
            )
        });

        return (<div className="currentClueContainer">
            <h3>Current Clue</h3>

                {clueTiles}
                {/* <div><Timer timer='90' /></div> */}
        </div>)
    }

}

export default CurrentClue; 