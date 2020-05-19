import React from 'react';
import instruct from '../images/instructions.mp4';
import arrow from '../images/arrow.png'
import '../css/instructions.css';

const instructions = (props) => {
    return (
            <div className="instructions-container">
                <video width="30%" controls>
                {/* <video width="640" height="360" controls> */}
                <source src={instruct} type="video/mp4"></source>
                Your browser does not support the video tag.
                </video>
                {/* <img className="video-arrow" src={arrow} alt="play arrow"/> */}
                <button onClick={props.demo} className="tutorial-button">Demo Game</button>
            </div>
    );
}

export default instructions;
