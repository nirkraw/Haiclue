
// import {receivePlayerOneTiles, 
// receivePlayerTwoTiles,
// receivePlayerThreeTiles,
// receivePlayerFourTiles
// } from "../../actions/player_actions"

// not finished
const mapDispatchToProps = (dispatch) => {
    return({
        //change to updatePlayerTiles: (tiles, id) => dispatch(updatePlayerTiles(tiles,id))
        receivePlayerOneTiles: (tiles) => dispatch( receivePlayerOneTiles(tiles)),
        receivePlayerTwoTiles: (tiles) => dispatch( receivePlayerTwoTiles(tiles)),
        receivePlayerThreeTiles: (tiles) => dispatch( receivePlayerThreeTiles(tiles)),
        receivePlayerFourTiles: (tiles) =>  dispatch( receivePlayerFourTiles(tiles))
    })
}
