import React from "react";
import { NavLink } from 'react-router-dom';
import '../css/logout-instructions-buttons.css';  


const LogoutInstructionsButton = (props) => {
        let quitButton;
        if  (props.handle === "Demo") {
            (quitButton = props.logout)
        } else {
            (quitButton = props.quit); 
        }
    
        if (props.start) {
            return (
                <div className="button-container">
                    <div className="lo-button" onClick={quitButton}>Quit Game</div>
                    <NavLink to='instructions' target="blank"><button className="instruction-hover">?</button></NavLink>
                </div>
            );
        } else {
            return (
                <div className="button-container">
                        {props.loggedIn ? (
                            <div className="lo-button" onClick={props.logout}>
                                Logout
                            </div>
                        ) : null }
                        <NavLink to='instructions' target="blank"><button className="instruction-hover">?</button></NavLink>
                </div>
            );
        } 
        
    }


export default LogoutInstructionsButton; 