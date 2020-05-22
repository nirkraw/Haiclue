import { RECEIVE_TILES } from "../actions/tile_actions";
//not done

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_TILES:
      return Object.assign({}, action.tiles.data);

    default:
      return state;
  }
}
