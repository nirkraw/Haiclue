import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playerOne: {
                handle: "player1",
                points: 0,
                target_word: "", 
                clue_array: [], 
                submitted: true
            }, 
            playerTwo :{
                handle: "player2",
                points: 3,
                target_word: "",
                clue_array: [],
                submitted: false
            }, 
            playerThree: {
                handle: "player3",
                points: 20,
                target_word: "",
                clue_array: [],
                submitted: false
            }, 
            playerFour: {
                handle: "player4",
                points: 1,
                target_word: "",
                clue_array: [],
                submitted: false
            }
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
        let secs = 20
        return (<div className="timer"> secs </div>)
    }
}

export default Timer; 

// makes a timer that is triggered from an event
// sets a visual countdown
// after countdown ends timer dissapears
// timer triggers functions at 0
