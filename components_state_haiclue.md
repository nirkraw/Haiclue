misc

sockets
create_room_form emits to
    app.js send info  -> 
        room.js sends gamestate to app.js ->
            app.js emits to react ->
                create_room_form passes props down ->
                    game
                        target_words
                        my_target_word
                        tile_bank
                            tile
                            clue_construction
                                tile


            



// have users auto sign in on sign up
// ensure unique handles at some point
// make random room name generator

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
<!-- favicon -->
<!-- change browser tab name -->
<!-- change header size login -->
<!-- add thumbnail to video -->
change submit to join function
<!-- add tiger board logo/link -->



//
backend method startGame() - deployed when 4 players join 
    setup
        <!-- sort the tile -->
        send to players
        <!-- choose 4 target words -->
        assign players target word
    display game container

phase 1 clue construction
    build/submit

phase 2 guess 
    p1 turn
        scoring
    p2 turn
        scoring
    p3 turn
        scoring 
    p4 turn
        scoring

after last round  method 3 game over 

reset


change "waiting for other players" line 69 of tile bank
style submit
style clue construction so it can be wider aka not overlap
remove numbers make case insensitive 
add error for empty room name

add css highlighting to cards when on guess phase