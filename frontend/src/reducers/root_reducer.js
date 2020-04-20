import {combineReducers} from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
// import tiles from './tiles_reducer';

const RootReducer = combineReducers({
    // entities,
    session,
    errors,
    // ui
});

export default RootReducer