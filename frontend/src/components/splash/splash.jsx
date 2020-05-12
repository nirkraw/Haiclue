import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';
import Instructions from './instructions';
import ExtInstructions from './external-instructions';
import React from 'react';
import { AuthRoute } from '../../util/route_util';
import { Route, NavLink } from 'react-router-dom';
import red from '../images/red-tile.png';
import blue from '../images/blue-tile.png';
import green from '../images/green-tile.png';
import yellow from '../images/yellow-tile.png';
import tbg from '../images/tbg-logo.png';
import '../css/splash.css';

class Splash extends React.Component {
  
  render() {

    return (
      <div>
        {/* hamburger menu */}
        <button className="hamburgers">
          <div></div>
          <div></div>
          <div></div>
        </button>
        {/* opens a menu with login signup instructions wills/site github  (jumps down screen when clicked or opens new window)*/}
        <h1 className='logo'>Haiclue</h1>
      
        <div className='splash-container'>
          <section className="splash-cards">
            <img src={blue} alt="blue"/>
            <img src={green} alt="green"/>
            <img src={red} alt="red"/>
            <img src={yellow} alt="yellow"/>
          </section>
          <h1 className="splash-label">Join a Game</h1>
            <div className='form-container'>
              <AuthRoute path="/" component={LoginFormContainer} />
              <AuthRoute path="/" component={SignupFormContainer} />
            </div>
          <h1 className="splash-label">How to Play 
            <NavLink to='instructions' target="blank"><button className="instruction-hover">?</button></NavLink>
          </h1>
          {/* opens model that contains instructions picture? with x up top and can click outside to close it */}
            <Route component={Instructions} />
        </div>  
        <footer>
            <a href="https://tigerboardgames.com/">
            <img className="tbg-link" src={tbg} alt="tiger board games"/>
            </a>
        </footer>    
      </div>
    );
  }
}

export default Splash;