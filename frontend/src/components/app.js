import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route } from 'react-router-dom';
import SplashContainer from './splash/splash_container';
import GameContainer from './game_container';
import Timer from './timer/timer'
import './css/index.css';

const App = () => (
  <div className='container'>
        <AuthRoute exact path="/" component={SplashContainer} />
        <ProtectedRoute path='/game' component={GameContainer} />
        <Route exact path="/timer" component={Timer} />
  </div>
);

export default App;