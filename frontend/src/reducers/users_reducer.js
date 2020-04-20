import {RECEIVE_USERS, RECEIVE_USER, } from '../actions/user_actions';
///not done
export default function(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                // either action + state or just action
            };
        case RECEIVE_USER:
            return {
                // return action + state
            };
        default:
            return state;
    }
}