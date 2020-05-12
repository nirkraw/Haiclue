import React from "react";
import { NavLink } from 'react-router-dom';
import '../css/logout-instructions-buttons.css';  

const LogoutInstructionsButton = (props) => {
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

export default LogoutInstructionsButton; 