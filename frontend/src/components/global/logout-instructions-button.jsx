import React from "react";
import { NavLink } from "react-router-dom";
import "../css/logout-instructions-buttons.css";

const LogoutInstructionsButton = (props) => {
  let quitButton;
  if (props.handle === "Demo") {
    quitButton = props.logout;
  } else {
    quitButton = props.quit;
  }

  if (props.start) {
    return (
      <div className="button-container">
        <a className="git-hover" href="https://github.com/nirkraw/Haiclue" target="blank">
          <i className="devicon-github-plain"></i>
        </a>
        <NavLink to="instructions" target="blank">
          <button className="instruction-hover">?</button>
        </NavLink>
        <div className="lo-button" onClick={quitButton}>
          Quit Game
        </div>
      </div>
    );
  } else {
    return (
      <div className="button-container">
        <a className="git-hover" href="https://github.com/nirkraw/Haiclue" target="blank">
          <i className="devicon-github-plain"></i>
        </a>
        <NavLink to="instructions" target="blank">
          <button className="instruction-hover">?</button>
        </NavLink>
        {props.loggedIn ? (
          <div className="lo-button" onClick={props.logout}>
            Logout
          </div>
        ) : null}
      </div>
    );
  }
};

export default LogoutInstructionsButton;
