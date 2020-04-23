import SubmitTest from "./submit_test";
import { connect } from "react-redux";
import {storeRoomName} from "../../actions/game_actions";
import {logout} from '../../actions/session_actions';

const mapStateToProps = (state) => {
  // debugger
  return {
    user: state.session.user,
    roomName: state.entities.game.roomName 
  };
};

const mapDispatchToProps = (dispatch) => ({

    logout: () => dispatch(logout()),
    storeRoomName: (roomName) => dispatch(storeRoomName(roomName)),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitTest);
