import CreateRoomForm from "./create_room_form";
import { connect } from "react-redux";
import { storeRoomName } from "../../actions/game_actions";
import { fetchTiles } from "../../actions/tile_actions";
import { logout } from "../../actions/session_actions";

const mapStateToProps = (state) => {
  return {
    user: state.session.user,
    loggedIn: state.session.isAuthenticated, 
    tiles: state.entities.tiles
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeRoomName: (roomName) => dispatch(storeRoomName(roomName)),
    fetchTiles: () => dispatch(fetchTiles()),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomForm);
