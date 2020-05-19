import React from "react";
import MyTargetWordContainer from "../my_target_word/my_target_word_container";
import TileBankContainer from "../tile_bank/tile_bank_container";
import CurrentClueContainer from "../current_clue/current_clue_container";
import RevealedClue from "../revealed_clue/revealed_clue";
import TargetWordsContainer from "../target_words/target_words_container";
import Logout from '../global/logout-instructions-button';
import GameOver from "../game_over/game_over";
import Scoreboard from "../scoreboard/scoreboard"; 

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.mainMenu = this.mainMenu.bind(this);
  }

  mainMenu(event) {
    if (event !== undefined) {
      event.preventDefault();
    }
     window.location.reload();
   }

  render() {

    const {gameState, socket} = this.props

    if(!gameState) return null;

    const players = Object.values(gameState.players);

    let playerTargetWord;
    let playerHandle;
    let revealed = false

     for (let index = 0; index < players.length; index++) {
            let player = players[index];

            if(player.revealedClue) {
                revealed = true 
                playerHandle = player.handle;
                playerTargetWord = player.correctWord

                setTimeout(() => {
                    socket.emit("unreveal clue", gameState.roomName)
                    revealed = false
                }, 5000);
            }
      }
// debugger
  return (
  <div>
      <Logout quit={this.mainMenu} start={this.props.gameState.gameStarted} logout={this.props.logout} loggedIn={this.props.loggedIn} /> 
      <h1 className="logo">Haiclue</h1>
      <div className="game-container">
          <div className="top-container">
            <TargetWordsContainer socket={this.props.socket} gameState={this.props.gameState} />
          </div>
          {(revealed) 
          ? <div className="middle-container">
            <RevealedClue revealed={revealed} socket={this.props.socket} gameState={this.props.gameState} />
          </div> 
          : <div className="middle-container">
            <CurrentClueContainer socket={this.props.socket} gameState={this.props.gameState}/>
            <TileBankContainer socket={this.props.socket} gameState={this.props.gameState} />
            {(this.props.gameState.over) 
            ? <GameOver socket ={this.props.socket} gameState={this.props.gameState}/>
            : <></>
          }
          </div> 
           }
          <div className="bottom-container">
            <MyTargetWordContainer  gameState={this.props.gameState} />
            <Scoreboard over={this.props.gameState.over} players= {this.props.gameState.players}/>  
          </div> 
      </div>
  </div>
  )
  }
}

export default Game;
