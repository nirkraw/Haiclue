import TileBank from "./tile_bank";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        user: state.session.user,
        roomName: state.entities.game.roomName
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TileBank);
