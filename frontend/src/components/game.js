
import React from 'react';
// import Scoreboard from '../components/target_words/scoreboard';
import MyTargetWord from './my_target_word/my_target_word';
import TileBank from './tile_bank/tile_bank';
import CurrentClue from './current_clue/current_clue';
import TargetWordsContainer from './target_words/target_words';
// import ClueConstruction from './tile_bank/clue_construction';
// import Timer from './timer/timer.jsx';
import '../components/css/grid.css';

class Game extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        return (<div>

            { (this.props.loggedIn) ? 
                    <button onClick={this.props.logout}> 
                    Logout 
                    </button>  : null }
                <h1 className='logo'>Haiclue!</h1>
                <div className ='gameContainer' >
                    <div className="topContainer">
                            <CurrentClue />
                            <TargetWordsContainer />
                    </div>
                    <div className='bottomContainer'>
                            <MyTargetWord />
                            <TileBank />          
                    </div>
                </div>
                </div>)
    }
}

export default Game;
