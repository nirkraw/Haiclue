import React from 'react';
import '../css/layout.css';
import Timer from '../timer/timer';
import Tile from './tile';

// Could be refactored into funcitonal component
class ClueContruction extends React.Component {
    constructor(props) {
        super(props)
        this.submitClue = this.submitClue.bind(this);
        this.insertLine = this.insertLine.bind(this);
        this.removeLine = this.removeLine.bind(this);
    }
    submitClue(e) {
        e.preventDefault();
        this.props.socket.emit("submit clue", this.props.roomName);

        const sound = document.getElementById("submit-sound");
        sound.currentTime = .1;
        sound.volume = .3;
        sound.play();
    }
    
    insertLine(e) {
        e.preventDefault();
        this.props.socket.emit("insert line", this.props.roomName);

        const sound = document.getElementById("submit-sound");
        sound.currentTime = 0.1;
        sound.volume = .3;
        sound.play();
    }

    removeLine(e) {
        e.preventDefault();
        this.props.socket.emit("remove line", this.props.roomName, e.currentTarget.id);

        const sound = document.getElementById("submit-sound");
        sound.volume = .3;
        sound.play();
    }


    render() {
        const { currentColor, player, roomName, socket } = this.props
        let clueConstruction = this.props.clueConstructionArray.map((tile, index) => {
            if (typeof tile === 'string') {
                return (
                  <span key={index*1000}>
                        <div id={index} key={index} onClick={this.removeLine} className={`color-${currentColor} tile add-line`}>&#8629;</div>
                    <br/>
                  </span>
                )
              }
            return (
                <Tile
                    key={tile._id}
                    currentColor={currentColor}
                    roomName={roomName}
                    socket={socket}
                    player={player}
                    tile={tile}
                    display={true}
                    type="clue"
                /> 
            );
        });
        return (<div>
            <button onClick={this.submitClue} id="clue-submit-button">Submit</button>
            
            <button onClick={this.insertLine} id="clue-add-line-button">Add Line</button>
            <div>

            {clueConstruction}
            </div>
            <div>
                {(this.props.timer) 
               ? <Timer
                    timer = {this.props.timer}
                    phase={'submit clue'}
                    secs={90}
                    socket={this.props.socket}
                    roomName={this.props.roomName}
                    handle={this.props.player.handle}
                    onClick={this.playSound}
                />
                : <div></div>
                }
            </div>
        </div>)
    }
}
export default ClueContruction;