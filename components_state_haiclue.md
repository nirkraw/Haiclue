// have users auto sign in on sign up


// COMPONENTS 

    target_words
        reducers
            - tilesReducer()
                default state => {tiles: []}
            - gameReducer()?
                default state => { round: 1 , phase: 1}
        methods
            - dispatch(fetchTiles())
            - dispatch(newRound())
            - selectTargetWords() - selects 4 random words from the tiles slice of state and removes them from slice of state, passes as props to MyTargetWord
            - flipTiles() - flips colors

            - makeGuess() - if clue construction is over (checks if all 4 players have their submit slice of state set to true), then if the guessed word is equal to the current player's target word, then assign points through the players state, sets the components this.state.guess to the guessed word
                // ^^ split up into methods

                <!-- - checkSubmittedGuesses() - checks if all 4 players have their submit slice of state set to true -->

                - checkGuessedWord() - checks if the guessed word is equal to the current player's target word


                    - assignPoints() - assign points through the players state, set submitted: false
                - incrementPhase() - increments the phase slice of state, sets this.state.guess = "" , if phase is greater than 4 sets phase to 0 and increments rounds, if rounds > 4 call gameOver else   calls newRound()
                    - newRound() - dispatch(fetchTiles()) - fetches 64 random tiles, dispatch(newRound()) - resets all appropriate slices of state: target_words: empty, clue_array: empty
                    - gameOver() - ends the game, pops up a modal that shows the score and the winner, shows button "Play again", 
                        - winner() - returns the player with the most points
                        - newGame() - resets the game to default state through dispatch(newGame())

    target_words > scoreboard
        // takes in as props, the guess from target words
        // takes in the players points from the players slice of state
        // guesses cards

    my_target_word        
        reducer 
            - playersReducer
                default state => { user: { handle: "", points: 0, target_word: "", clue_array: [], submitted: false} }
        methods
            - selectTargetWord() - choose target word and adds it the the players state
            
    tile_bank
        reducers
            - tilesReducer  
        methods
            - fillTileBank() - selects 15 random words from the bank and removes them from the bank
            - flipTiles() - flips colors
            - handleInput() - updates the component state with selected words
                - the clue construction component reads whatever is in the components state
            - handleSubmit() - updates the player state's clue_array, sets player's submitted state to true

    tile_bank > clue_construction
        // renders ownProps from tile_bank

    timer
        // needs a handleSubmit() to trigger the end of clue construction phase
        // needs a handleSubmit() to trigger the end of guessing phase

    current_clue
        reducers
        methods
            - fillCurrentClue() - gets the clue_array for the current player


// SAMPLE STATE

    entities: {
        tiles: [],
        games: { round: 1 , phase: 1}
        players: [
                player: { 

                        handle: "", 
                        points: 0, 
                        target_word: "", 
                        clue_array: [], 
                        submitted: false
                    } 
                        
            ]
    }, 
    
    ui: {
        modal: {}, 
        timer: {}
    }, 






todays goals
1 make a form on the login page to create a room
2 get a player to create a room  (console log and room name on the screen )
3 make a join form
4 get a player to join rooms (console log and room name on the screen when they join)
5 get a emit to send to only players in a specific room


6 limit rooms to 4
7 figure out id system for the 4 players



// things to do after lunch
- give route for the create form to test