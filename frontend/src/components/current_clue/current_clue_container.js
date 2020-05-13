import { connect } from "react-redux";
import CurrentClue from "./current_clue";
/// might not need this container
const mapStateToProps = (state) => {

    return({
        user: state.session.user
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentClue);