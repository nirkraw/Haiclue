import React from 'react';
import instruct from '../images/instructions.mp4'
const instructions = () => {
    return (
        <div>
            <div>Instructions</div>
            <video width="640" height="360" controls>
            <source src={instruct} type="video/mp4"></source>
            Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default instructions;
