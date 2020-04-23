
import React from 'react';
import MyTargetWord from './my_target_word/my_target_word';
import TileBank from './tile_bank/tile_bank';
import CurrentClue from './current_clue/current_clue';
import TargetWordsContainer from './target_words/target_words';


const Game = (props) => (
        <div>
            { (props.loggedIn) ? 
                    <button onClick={props.logout}> 
                    Logout 
                    </button>  : null }

                    <h1 className='logo'>Haiclue!</h1>
                    <div className = 'gameContainer' >
                        <div className="topContainer">
                                <CurrentClue />
                                <TargetWordsContainer />
                        </div>
                        <div className='bottomContainer'>
                                <MyTargetWord />
                                <TileBank />
                            
                        </div>
                    </div>
        </div>
)


export default Game;
