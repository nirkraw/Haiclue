import {RECEIVE_LOGIN_ERRORS, RECEIVE_SIGNUP_ERRORS, RECEIVE_CURRENT_USER} from '../actions/session_actions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_LOGIN_ERRORS:
            return {loginErrors: action.loginErrors };
        case RECEIVE_SIGNUP_ERRORS:
            return {signUpErrors: action.signUpErrors}
        case RECEIVE_CURRENT_USER:
            return _nullErrors;
        default:
            return state;
    }    
};

export default SessionErrorsReducer;