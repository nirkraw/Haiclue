// import {RECEIVE_GAME, END_GAME, } from '../actions/user_actions';
import { STORE_ROOM_NAME } from '../actions/game_actions'; 


// const _nullGame = Object.freeze({id: null})

// export default function(state = initialState, action) {

const initialState = {roomName: ""}
export default function(state = initialState, action) {
    switch (action.type) {
        // case RECEIVE_GAME:
        //         const newGame = {[action.game.id]: action.game};
        //         return Object.assign({}, oldState, newGame);
        // case END_GAME:
        //     return _nullGame;
        case STORE_ROOM_NAME:
            return {roomName: action.roomName}
        default:
            return state;
    }
}