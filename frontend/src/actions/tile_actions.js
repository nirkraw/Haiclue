import * as APIUtil from "../util/tiles_api_util";

export const RECEIVE_TILES = "RECEIVE_TILES";

export const receiveTiles = (tiles) => ({
  type: RECEIVE_TILES,
  tiles: tiles,
});

export const fetchTiles = () => (dispatch) =>
  APIUtil.fetchTiles().then((tiles) => dispatch(receiveTiles(tiles)));
