import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';
import Instructions from './instructions';
import React from 'react';
import { AuthRoute } from '../../util/route_util';
import { Route } from 'react-router-dom';
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
      
        <div className='splashContainer'>
          <section className="splashCards">
            <img src={blue} alt="blue"/>
            <img src={green} alt="green"/>
            <img src={red} alt="red"/>
            <img src={yellow} alt="yellow"/>
          </section>
          <h1 className="splashLabel">Join a Game</h1>
            <div className='formContainer'>
              <AuthRoute path="/" component={LoginFormContainer} />
              <AuthRoute path="/" component={SignupFormContainer} />
            </div>
          <h1 className="splashLabel">How to Play <button className="instruction-hover">?</button></h1>
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