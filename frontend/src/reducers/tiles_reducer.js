import { RECEIVE_TILES } from '../actions/tile_actions';
 //not done

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_TILES:

        // let tileArr = []
        // while (tileArr.length < 64) {
        //    let tile = Math.floor((Math.random() * 216) + 1)
        //    if (tileArr.includes(action.tile.data[tile])) {
        //        tileArr.push(action.tile.data[tile])
        //    }
        // }   
        // send object no keys send all
        // const newTiles = {tiles: tileArr};
        
        return Object.assign({}, action.tiles.data);

        default:
            return state;
    }
}