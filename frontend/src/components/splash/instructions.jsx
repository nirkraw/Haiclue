import React from 'react';
import instruct from '../images/instructions.mp4';
import arrow from '../images/arrow.png'
import '../css/instructions.css';


class Instructions extends React.Component {
    constructor(props) {
      super(props)
    this.handleDemoSubmit = this.handleDemoSubmit.bind(this)
    }
  

    handleDemoSubmit(e) {
        e.preventDefault();
        this.props.login({
            email: "demo@demo.com",
            password: 'password',
        })
    }

    render() {
        return (
                <div className="instructions-container">
                    <video width="30%" controls>
                    <source src={instruct} type="video/mp4"></source>
                    Your browser does not support the video tag.
                    </video>
                    <button onClick={this.handleDemoSubmit} className="tutorial-button">Demo Game</button>
                </div>
        );
    }
}

export default Instructions;
