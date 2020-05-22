import {connect} from 'react-redux';
import {signup} from '../../actions/session_actions';
import {login} from '../../actions/session_actions';
import SignupForm from './signup_form';


const msp = (state) => ({
    errors: state.errors.session.signUpErrors,
    
});


const mdp = dispatch => ({
    signup: formUser => dispatch(signup(formUser)),
    login: formUser => dispatch(login(formUser))
});

export default connect(msp, mdp)(SignupForm);