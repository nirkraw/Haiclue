import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            secs: 20
        }; 
    }

    componentDidMount() {
        // let secs = 20
        // while (secs > 1) {
        //     setTimeout((secs, ele),1000)
        //     secs--;


        // }
    }



    render() {
        let secs = this.state.secs
        return (<div className="timer"> {secs} </div>)
    }
}

export default Timer; 

// makes a timer that is triggered from an event
// sets a visual countdown
// after countdown ends timer dissapears
// timer triggers functions at 0
