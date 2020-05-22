import { combineReducers } from "redux";
import tilesReducer from "./tiles_reducer";
import gameReducer from "./game_reducer";
// import playersReducer from './players_reducer';

export default combineReducers({
  tiles: tilesReducer,
  game: gameReducer,
  // players: playersReducer
});
