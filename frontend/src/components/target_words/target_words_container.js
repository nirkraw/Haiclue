import { connect } from "react-redux";
import TargetWords from "./target_words"
import {startingTiles} from "../../reducers/selectors"
// import {fetchTiles} from "../../actions/tile_actions"
// import {fetchPlayers} from "../../actions/player_actions"
// import {fetchGame} from "../../actions/gameactions"

const mapStateToProps = (state) => {

    return({
        // tiles: startingTiles(state),// 64 random tiles
        // playerOne: state.entities.players[0],
        // playerTwo: state.entities.players[1],
        // playerThree: state.entities.players[2],
        // playerFour: state.entities.players[3]
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        // fetchTiles: () => dispatch(fetchTiles()),
        // fetchPlayers: () => dispatch(fetchPlayers()),
        // fetchGame: () => dispatch(fetchGame()),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetWords)