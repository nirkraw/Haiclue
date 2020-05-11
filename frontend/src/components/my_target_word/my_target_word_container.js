import MyTargetWord from "./my_target_word";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        user: state.session.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTargetWord);
