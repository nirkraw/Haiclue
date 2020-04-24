import CreateRoomForm from "./create_room_form";
import { connect } from "react-redux";
import { storeRoomName } from "../../actions/game_actions";
import { startingTiles } from "../../reducers/selectors";
import { fetchTiles } from "../../actions/tile_actions";

const mapStateToProps = (state) => {
  // debugger
  return {
    user: state.session.user,
    tiles: startingTiles(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeRoomName: (roomName) => dispatch(storeRoomName(roomName)),
    fetchTiles: () => dispatch(fetchTiles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomForm);
