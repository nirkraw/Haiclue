import {RECEIVE_USERS, RECEIVE_USER, } from '../actions/user_actions';
///not done

const initialState = [{player_one: {}}, {player_two: {}}, {player_three: {}}, {player_four: {}}]

export default function(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_PLAYER_ONE:
            return {
                // either action + state or just action
            };
        case RECEIVE_PLAYER_TWO:
            return {
                    // either action + state or just action
                };
        case RECEIVE_PLAYER_THREE:
            return {
                        // either action + state or just action
            };
        case RECEIVE_PLAYER_FOUR:
            return {
                // either action + state or just action
            };
        default:
            return state;
    }
}


players [p1, p2, p3, p4]
    p1: { 
        handle: "", 
        points: 0, 
        target_word: "", 
        clue_array: [], 
        submitted: false

    } 
    p2:{ 

        handle: "", 
        points: 0, 
        target_word: "", 
        clue_array: [], 
        submitted: false
    } 
    p3:{ 

        handle: "", 
        points: 0, 
        target_word: "", 
        clue_array: [], 
        submitted: false
    } 
    p4:{ 

        handle: "", 
        points: 0, 
        target_word: "", 
        clue_array: [], 
        submitted: false
    } 
}