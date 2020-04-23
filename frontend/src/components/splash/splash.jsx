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
import '../css/splash.css';

class Splash extends React.Component {
  
  render() {

    return (
      <div>
        <h1 className='logo'>Haiclue!</h1>
      
        <div className='splashContainer'>
          <section className="splashCards">
            <img src={blue} alt="blue"/>
            <img src={green} alt="green"/>
            <img src={red} alt="red"/>
            <img src={yellow} alt="yellow"/>
          </section>
          <h1>Join a Game</h1>
            <div className='formContainer'>
              <AuthRoute path="/" component={SignupFormContainer} />
              <AuthRoute path="/" component={LoginFormContainer} />
            </div>
          <h1>How to Play</h1>
            <Route component={Instructions} />
        </div>  
        <footer>
            <a href="#">Tiger Board Games</a>
        </footer>    
      </div>
    );
  }
}

export default Splash;