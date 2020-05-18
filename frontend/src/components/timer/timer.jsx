import React from 'react';
import '../css/timer.css';

class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            secs: this.props.secs, 
            timeClass: ""

        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.state.secs === 0) {
                clearInterval(this.interval)
                //your pretty socket code here!
                // debugger
                if (this.props.phase === 'submit clue') {
                 this.props.socket.emit(this.props.phase, this.props.roomName, this.props.handle, ); 
                }

                if (this.props.phase === 'submit guess') {
                    const { socket, phase, roomName, localPlayerHandle, currentPlayerHandle } = this.props

                //  this.props.socket.emit(this.props.phase, this.props.roomName, this.props.handle, ); 
                 socket.emit(phase, roomName, localPlayerHandle, false, currentPlayerHandle)
                }

                const timesUpSound = document.getElementById("time-up-sound");
                timesUpSound.volume = .4;
                timesUpSound.play();


            } else if ((this.state.secs < 7) && (this.state.secs % 2 === 0)) {
                const countDown = document.getElementById("countdown");
                countDown.volume = .4;
                countDown.currentTime = 0;
                countDown.play()
                this.setState({
                    secs: (this.state.secs - 1),
                    timeClass: "timer-flash",
                })
            } else {
                this.setState({
                    secs: (this.state.secs - 1),
                    timeClass: "",
                })
            }
        }, 1000)
    }


    componentWillUnmount() {
        clearInterval(this.interval) //safety precaution
    }

    render() {
        let secs = this.state.secs
        let timeClass = this.state.timeClass 
        return (
            <div className={`timer  ${timeClass}`} >time left {secs} </div>
        )
    }
}
export default Timer;
