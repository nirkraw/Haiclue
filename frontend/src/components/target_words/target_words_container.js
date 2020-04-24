import { connect } from "react-redux";
import TargetWords from "./target_words";
import {startingTiles} from "../../reducers/selectors";
import {fetchTiles} from "../../actions/tile_actions";

const mapStateToProps = (state) => {
    // debugger; 
    return({
        tiles: startingTiles(state),
        roomName: state.entities.game.roomName 
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        fetchTiles: () => dispatch(fetchTiles()),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetWords);