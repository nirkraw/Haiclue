//

frontend/
    actions/     
    reducers/ 
    components/
        splash/
            splash_container.js 
            splash.jsx
                instructions.jsx
                 // if !loggedin?
                create_session_form.jsx
                 // else 
                create_or_join_game_form.jsx
                join_demo_game.jsx
        lobby_container.js
        lobby.jsx
            pending_game.jsx

        game/
            game_over.jsx
            game_container.js
            game.jsx
                timer.jsx
                center_tiles.jsx
                player_hud.jsx
                opponent_hud.jsx
                clue_contruction.jsx
    store/ 
    util/ 
        user/
             create
             index
             show
        session/
            create
            destroy
        tiles/ 
            index
        games/ 
            show
            create
            destroy
    app.js


    state = {
        session_id: null,

        entities: {
            current_game: null, 
            tiles: {}, 
            centerTiles: {}, 
            users: {
                []: { tiles: [] },
            },

        errors: [], 
        
        ui: {
            timer: {}, 
            loading: t/f,
        },
    }
}