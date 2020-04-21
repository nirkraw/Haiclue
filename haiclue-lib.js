// in Game container we would want additional logic to only recieve 60 unique random tiles // array of 60 unique tiles
    // have some sort of logic to pop tile object from array and send to the player tile reducer slice of state



    // default_state = {player1: [], player2: [], player3: [], player4:[]}
// const newState = Object.assign({}, default_state)
//     case RECEIVE_PLAYER_1
    
//         newState.player1 = action.payload
//         return newState
//     case RECEIVE_PLAYER_2
//     case RECEIVE_PLAYER_3
//     case RECEIVE_PLAYER_4

// on setup tiles will be chosen for player in the background

// order of  player will be determined by join order in the game


// clue creation phase
// when the game starts (after players join) game will fetch 4 random tiles and display a random side (black/white)
    // each of the 4 tiles will have to be given a number 1-4 and then those numbers a randomly assigned to the player
    // so that they can start building clues

// guessing phase
// each player's clue will be guessed upon for ~20 seconds.
    // The other 3 players will submit their guess of the middle tiles. 

// The round will advance to the points stage once the timer expires or the three guessing players have locked in their guesses.
    // Keep track of guesses in a global state so that they can be referenced once all guessed are submitted. 
    // Having a boolean value for player guess submitted (true/false) or we check that the length of the guess === 3.

    // if the timer went off or the guesses are all locked in, we then nextplayer() where we divy up the points(), reset the is locked in to false. 
    // Dislpay the next players clues. 

// Need to keep track of whether all the players have had their clues guessed. 
// Need to keep track the rounds of the overall game. (3 or 4 rounds total)

// gameover() that will display points who won, who won less, displays button asked play again? which would then reset the game.
// by calling resetgame() which will then take it from the top




// submit a clue,

// each p

// player tile reducer

//clue_sumbmission_reducer => player(x) slice of state containing array of submitted clue words

// export class Game {
//   constructor(props) { // (tiles an array) 
//     super(props)
//   }
//   componentDidMount() {
//       fetchTiles()
//   }
// }




// //each player 





// export class Tile {
//   constructor(board, pos) {
//       this.board = board;
//       this.pos = pos;
//       this.bombed = false;
//       this.explored = false;
//       this.flagged = false;
//   }
// }


// constructer(players? )