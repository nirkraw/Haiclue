import {connect} from 'react-redux';
import {logout, login} from '../../actions/session_actions';
import Splash from './splash';


const msp = (state) => ({
    loggedIn: state.session.isAuthenticated
});

//demobranch
const mdp = dispatch => ({
    logout: () => dispatch(logout()),
    login: formUser => dispatch(login(formUser))
});

export default connect(msp, mdp)(Splash);