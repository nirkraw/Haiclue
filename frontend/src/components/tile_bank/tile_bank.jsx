import React from 'react';
import ClueConstruction from './clue_construction';


class TileBank extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTiles: [
                {
                    "_id": "5e9deccab0fb6a39f7219f8d",
                    "black": "oil",
                    "white": "brains",
                    "__v": 0
                },
                {
                    "_id": "5e9deccab0fb6a39f7219f8a",
                    "black": "flat",
                    "white": "spy",
                    "__v": 0
                },
                {
                    "_id": "5e9deccab0fb6a39f7219f8e",
                    "black": "bump",
                    "white": "radio",
                    "__v": 0
                },
                {
                    "_id": "5e9deccab0fb6a39f7219f8b",
                    "black": "horn",
                    "white": "badge",
                    "__v": 0
                },
                {
                    "_id": "5e9deccab0fb6a39f7219f8f",
                    "black": "walking",
                    "white": "direct",
                    "__v": 0
                },
                {
                    "_id": "5e9dece5146f803a3a1bacf9",
                    "black": "bump",
                    "white": "radio",
                    "__v": 0
                },
                {
                    "_id": "5e9dece5146f803a3a1bacf8",
                    "black": "oil",
                    "white": "brains",
                    "__v": 0
                },
                {
                    "_id": "5e9dece5146f803a3a1bacf5",
                    "black": "flat",
                    "white": "spy",
                    "__v": 0
                },
                {
                    "_id": "5e9dece5146f803a3a1bacf6",
                    "black": "horn",
                    "white": "badge",
                    "__v": 0
                },
                {
                    "_id": "5e9dece5146f803a3a1bacf7",
                    "black": "hurting",
                    "white": "smart",
                    "__v": 0
                },
                {
                    "_id": "5e9dece5146f803a3a1bacfb",
                    "black": "stolen",
                    "white": "share",
                    "__v": 0
                },
                {
                    "_id": "5e9dece5146f803a3a1bacfa",
                    "black": "walking",
                    "white": "direct",
                    "__v": 0
                },
                {
                    "_id": "5e9dece5146f803a3a1bacfc",
                    "black": "space",
                    "white": "scotch",
                    "__v": 0
                },
                {
                    "_id": "5e9dece5146f803a3a1bacfe",
                    "black": "saved",
                    "white": "source",
                    "__v": 0
                },
                {
                    "_id": "5e9dece5146f803a3a1bacfd",
                    "black": "jam",
                    "white": "master",
                    "__v": 0
                }
            ], 
            currentColor: "black",
            selectedTiles: [], // will be passed down to ClueConstruction
        }
    }

    // componentDidMount() {
    //     this.props.fillTileBank()
    // }

    // eventually will grab the 15 random tiles from the tile bank

    render() {

        let currentColor = this.state.currentColor;
        let tiles = this.state.currentTiles.map(tile => {
            let tileSide = tile[currentColor]; 
            return (<div className={`color-${currentColor} tile`}>
                            {tileSide}
                    </div>)
        });

        return (<div className="bankAndClueConstructContainer">
         
                <div className="clueConstructionContainer">
                    <ClueConstruction />
                    {/* Eventually here we will pass down constructed clue array from this.state.selectedTiles */}
                </div>
                
                <div className="tileBankContainer">
                <h3>Tilebank</h3>
                    {tiles}
                </div>
       
        </div>)
    }

}

export default TileBank;