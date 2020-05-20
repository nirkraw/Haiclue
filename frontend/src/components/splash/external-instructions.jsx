import React from 'react';
import '../css/instructions.css';
import '../css/layout.css'; 
import '../css/scoreboard.css'
import centerTiles from '../images/instructions-center-tiles.png';
import blue from '../images/blue-tile.png';
import red from '../images/red-tile.png';
import green from '../images/green-tile.png';
import yellow from '../images/yellow-tile.png';
import walletTile from '../images/instructions-wallet.png';
import glasses from '../images/glasses.png';
import thinking from '../images/thinking.png';
import tileBank from '../images/instructions-tile-bank.png';
import clue from '../images/instructions-clue.png';

const ExtInstructions = () => {

    return (
        <div className="external-instructions-container">
            <h1>How to Play <span className="color-yellow">Haiclue</span></h1>
            <ul className='instructions-ul'>

                <li>
                    <div className='left'>Every player will be assigned a card.</div>
                    <div className='right'>
                        <div className='instructions-center-tiles'>
                            <figure>
                                <img src={blue}></img>
                                <figcaption><div className="tile color-white">wallet</div></figcaption>
                            </figure>
                            <figure>
                                <img src={red}></img>
                                <figcaption><div className="tile color-white">wallet</div></figcaption>
                            </figure>
                            <figure>
                                <img src={green}></img>
                                <figcaption><div className="tile color-white">wallet</div></figcaption>
                            </figure>
                            <figure>
                                <img src={yellow}></img>
                                <figcaption><div className="tile color-white">wallet</div></figcaption>
                            </figure>
                        </div>
                    </div>
                </li>
                
                <li>
                    <div className='left'>A player's assigned card will appear in the lower left corner next to it's associated tile.</div>
                    <div className='right'>
                        <div className='target-word-imgs'>
                            <img className='card' src={blue}></img>
                            <div className="tile color-white">wallet</div>
                        </div>
                    </div>
                </li>  

                <li>
                    <div className='left'>Wait for all of the other players to submit their clues. You can tell if a player has submitted by their emojis on the scoreboard.</div> 
                    <div className='right'> 
                        <div className='emoji-container'>
                            <figure><img src={thinking}></img>
                                <figcaption><span className='color-red'>Not submitted &#10006;</span></figcaption> 
                            </figure>
                            
                            <figure><img src={glasses}></img>
                                <figcaption><span className='color-green'>Submitted &#10003;</span></figcaption>  </figure>    
                        </div>
                    </div>    
                </li>

                <li><div className='left'>Next, use up to 15 random tiles to construct a clue for your word.</div>
                    <div className='right'> 
                        <div className='instructions-bank'>
                            <div className="tile color-white">lived</div>
                            <div className="tile color-white">pattern</div>
                            <div className="tile color-white">trial</div>
                            <div className="tile color-white">rescue</div>
                            <div className="tile color-white">sail</div>
                            <div className="tile color-white">climb</div>
                            <div className="tile color-white">agreed</div>
                            <div className="tile color-white">walking</div>
                            <div className="tile color-white">oil</div>
                            <div className="tile color-white">return</div>
                            <div className="tile color-white">system</div>
                            <div className="tile color-white">budget</div>
                            <div className="tile color-white">form</div>
                            <div className="tile color-white">casino</div>
                            <div className="tile color-white">ticket</div>
                        </div>
                    </div>

                </li>

                <li><div className='left'>Use the add line button to separate clues into multiple lines.</div>
                    <div className='right'> 
                        <div className='instructions-clue'>
                            <div className="tile color-white">budget</div>
                            <div className="tile color-white">form</div>
                            <div className="tile color-white">&#8629;</div>
                            <br></br>
                            <div className="tile color-white">casino</div>
                            <div className="tile color-white">ticket</div>
                        </div>
                    </div>

                </li>  

                <li><div className='left'>The other players guess your word.</div>
                    <div className='right'>
                        <div className='instructions-guess'>
                            <h2><span className='color-green'>&#10003;</span>  <span>Paul's guess was <span className='color-yellow'>wallet</span></span><img src={blue}></img>  </h2>
                            <h2><span className='color-red'>&#10006;</span>  <span>Sara's guess was <span className='color-yellow'>electric</span></span><img src={green}></img>   </h2>
                            <h2><span className='color-red'>&#10006;</span>  <span>Khaleel's guess was <span className='color-yellow'>jam</span></span><img src={yellow}></img>   </h2>
                        </div>
                    </div>
                </li>  

                <li><div className='left'>If they are correct, both of you will score a point.</div>
                    <div className='right'>
                        <div className='scoreboard-container'>
                            <div className='wrapper'>
                                <div className="points-div">1</div>
                                <div className="handle-div">Bart</div>
                            </div>
                            <div className='wrapper'>
                                <div className="points-div">1</div>
                                <div className="handle-div">Paul</div>
                            </div>
                            <div className='wrapper'>
                                <div className="points-div">0</div>
                                <div className="handle-div">Sara</div>
                            </div>
                            <div className='wrapper'>
                                <div className="points-div">0</div>
                                <div className="handle-div">Khaleel</div>
                            </div>
                        </div>
                    </div>
                </li>  
            </ul>


        </div>
    );

}

export default ExtInstructions;