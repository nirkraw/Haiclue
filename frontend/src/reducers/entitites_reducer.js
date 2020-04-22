import { combineReducers } from 'redux';
import tilesReducer from './tiles_reducer';

export default combineReducers({
    tiles: tilesReducer
});