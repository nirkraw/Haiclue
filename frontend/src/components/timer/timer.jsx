import React from 'react';
class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            secs: 20
        };
    }
    componentDidMount() {
        const { timer } = this.props //sets the count based on props
        this.setState({ secs: timer })
        this.interval = setInterval(() => {
            if (this.state.secs === 0) {
                clearInterval(this.intervalnterval)
                //your pretty socket code here!
            } else {
                this.setState({
                    secs: this.state.secs - 1
                })
            }
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.interval) //safety precaution
    }
    render() {
        let secs = this.state.secs
        return (<div className="timer">time left {secs} </div>)
    }
}
export default Timer;
// makes a timer that is triggered from an event
// sets a visual countdown
// after countdown ends timer dissapears
// timer triggers functions at 0