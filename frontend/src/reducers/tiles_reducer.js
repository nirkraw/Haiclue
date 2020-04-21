import {RECEIVE_TILES} from '../actions/tile_actions';
 //not done
export default function(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_TILES:
                const newTiles = {[action.tile.id]: action.tile};
                return Object.assign({}, oldState, newTiles);
        default:
            return state;
    }
}