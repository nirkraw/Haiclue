import CreateLobbyForm from "./create_lobby_form";
import { connect } from "react-redux";
// import {storeRoomName} from "../../actions/game_actions";

const mapStateToProps = (state) => {
  // debugger
  return {
    user: state.session.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // storeRoomName: (roomName) => dispatch(storeRoomName(roomName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateLobbyForm);
