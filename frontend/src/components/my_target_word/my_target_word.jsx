import React from 'react';
import '../css/layout.css';


class MyTargetWord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            word: "moon",
            img: "#" 
            // maybe this component needs to be passed props from TargetWords instead of its own container
            // to get the associated card
        }
    }

    render() {
        return (<div className="myTargetWordContainer">
            <h3>My Target Word</h3>
            <img src="#" className="associatedCard"/>
            <div className='myTargetWord'>{this.state.word}</div>
        </div>)
    }

}


export default MyTargetWord;