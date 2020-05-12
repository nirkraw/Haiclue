import { connect } from "react-redux";
import TargetWords from "./target_words";
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

export default connect(mapStateToProps, mapDispatchToProps)(TargetWords);