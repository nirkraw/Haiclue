import { RECEIVE_USERS, RECEIVE_USER } from "../actions/user_actions";

const initialState = [
  { player_one: {} },
  { player_two: {} },
  { player_three: {} },
  { player_four: {} },
];

export default function (state = initialState, action) {
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
