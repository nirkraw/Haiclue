import React from 'react';
import '../css/instructions.css';
import InstructionsImg from '../images/external-instructions.jpg';

const ExtInstructions = () => {

    return (
        <div className="external-instructions-container">
            <h1>How to Play <span className="color-yellow">Haiclue</span></h1>
            <img src={InstructionsImg} alt="instructions-image"/>
        </div>
    );

}

export default ExtInstructions;