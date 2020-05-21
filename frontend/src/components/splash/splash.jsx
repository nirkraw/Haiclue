import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';
import InstructionsContainer from './instructions_container';
import React from 'react';
import { AuthRoute } from '../../util/route_util';
import { Route, NavLink } from 'react-router-dom';
import red from '../images/red-tile.png';
import blue from '../images/blue-tile.png';
import green from '../images/green-tile.png';
import yellow from '../images/yellow-tile.png';
import tbg from '../images/tbg-logo.png';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import nicole from '../images/nicole.jpg';
import nir from '../images/nir.png';
import edward from '../images/edward.jpg'; 
import sammy from '../images/sammy.jpg';
import '../css/splash.css';

class Splash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: true
    }
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(e) {
    e.preventDefault(); 
    if (this.state.menu === true) {
      this.setState({menu: false})
    } else {
      this.setState({menu: true})
    }
  }

  render() {

    let menu = (
      <div className="hamburger-menu">
        <a href="#howToPlay">How to Play</a>
        <a href="#logIn">Play</a>
        <a href="#signUp">Sign Up</a>
        <a target="blank" href="https://tigerboardgames.com/">Website</a>
        <a target="blank" href="https://github.com/nirkraw/Haiclue">Github <i class="devicon-github-plain"></i></a>
        <a href='#devs'>Dev Team</a>
      </div>)

    return (
      <div>
        {/* hamburger menu */}
        <button className="hamburgers" onClick={this.toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </button>

        <ReactCSSTransitionGroup
          transitionName="menu"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300} >
            {this.state.menu ? menu : null} 
        </ ReactCSSTransitionGroup>
        {/* opens a menu with login signup instructions wills/site github  (jumps down screen when clicked or opens new window)*/}
        <h1 className='logo'>Haiclue</h1>
      
        <div className='splash-container'>
          <section className="splash-cards">
            <img src={blue} alt="blue"/>
            <img src={green} alt="green"/>
            <img src={red} alt="red"/>
            <img src={yellow} alt="yellow"/>
          </section>

          <h1 className="splash-label" className='how-to-play' id="howToPlay">How to Play 
            
          </h1>
          {/* opens model that contains instructions picture? with x up top and can click outside to close it */}
            <Route component={InstructionsContainer} />
            
          <h1 className="splash-label">Join a Game</h1>
            <div className='form-container'>
              <AuthRoute path="/" component={LoginFormContainer} />
              <AuthRoute path="/" component={SignupFormContainer} />
            </div>
          <h1 className="splash-label" id="devs">Dev Team</h1>
          <div className='team-container'>
              <figure className="profile">
                  {/* <a href="https://github.com/etrinidad132" target="_blank"> */}
                  <a href="https://etrinidad132.github.io/" target="_blank">
                      <img src={edward} className="dev-img"></img>
                      <figcaption>Edward</figcaption>
                  </a>
              </figure>
            <figure className="profile">
                {/* <a href="https://github.com/nicolsama" target="_blank" > */}
                <a href="https://www.nicolesamanich.com/" target="_blank" >
                    <img src={nicole} className="dev-img"></img>
                    <figcaption>Nicole</figcaption>
                  </a>
              </figure>
            <figure className="profile">
                {/* <a href="https://github.com/nirkraw" target="_blank" > */}
                <a href="https://nirkraw.github.io/" target="_blank" >
                    <img src={nir} className="dev-img"></img>
                    <figcaption>Nir</figcaption>
                  </a>
              </figure>
            <figure className="profile">
                {/* <a href="https://github.com/Shrewbitz" target="_blank" > */}
                <a href="https://shrewbitz.github.io/" target="_blank" >
                    <img src={sammy} className="dev-img"></img>
                    <figcaption>Sammy</figcaption>
                  </a>
              </figure>
          </div>
        </div>  
        <footer>
            <a target="blank" href="https://tigerboardgames.com/">
            <img className="tbg-link" src={tbg} alt="tiger board games"/>
            </a>

            <a target="blank" className="gh-link" href="https://github.com/nirkraw/Haiclue">
              <i class="devicon-github-plain"></i>
            </a>
        </footer>    
      </div>
    );
  }
}

export default Splash;