import {RECEIVE_GAME, END_GAME, } from '../actions/user_actions';
 //subject to change
//not done

const _nullGame = Object.freeze({id: null})

export default function(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_GAME:
                const newGame = {[action.game.id]: action.game};
                return Object.assign({}, oldState, newGame);
        case END_GAME:
            return _nullGame;
        default:
            return state;
    }
}