import {connect} from 'react-redux';
import {signup, login} from '../../actions/session_actions';
import CreateSessionForm from './create_session_form';


const msp = (state) => ({
    errors: errors.session,
    
});


const mdp = dispatch => ({
    signup: formUser => dispatch(signup(formUser)),
    login: formUser => dispatch(login(formUser))
});

export default connect(msp, mdp)(CreateSessionForm);