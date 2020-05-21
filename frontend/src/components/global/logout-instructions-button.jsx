import React from "react";
import { NavLink } from 'react-router-dom';
import '../css/logout-instructions-buttons.css';  


class LogoutInstructionsButton extends React.Component {
    constructor(props) {
        super(props)
        
    }
    render() {
        
        let quitButton;
        if  (this.props.handle === "Demo") {
            (quitButton = this.props.logout)
        } else {
            (quitButton = this.props.quit); 
        }
    
        if (this.props.start) {
            return (
                <div className="button-container">
                    <div className="lo-button" onClick={quitButton}>Quit Game</div>
                    <NavLink to='instructions' target="blank"><button className="instruction-hover">?</button></NavLink>
                </div>
            );
        } else {
            return (
                <div className="button-container">
                        {this.props.loggedIn ? (
                            <div className="lo-button" onClick={this.props.logout}>
                                Logout
                            </div>
                        ) : null }
                        <NavLink to='instructions' target="blank"><button className="instruction-hover">?</button></NavLink>
                </div>
            );
        } 
        
    }
}

export default LogoutInstructionsButton; 