import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import Instructions from './instructions';


const msp = (state) => ({
    errors: state.errors.session.loginErrors,
});


const mdp = dispatch => ({
    login: formUser => dispatch(login(formUser))
});

export default connect(msp, mdp)(Instructions);