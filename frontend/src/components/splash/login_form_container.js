import {connect} from 'react-redux';
import {login} from '../../actions/session_actions';
import LoginForm from './login_form';


const msp = (state) => ({
    errors: state.errors.session.loginErrors,
    
});


const mdp = dispatch => ({
    login: formUser => dispatch(login(formUser))
});

export default connect(msp, mdp)(LoginForm);