// src/components/app.js

import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import {
  Route,
  // Redirect,
  // withRouter,
  // Switch, 
} from 'react-router-dom';
import Scoreboard from '../components/target_words/scoreboard';

import SplashContainer from './splash/splash_container';



const App = () => (
  <div>
        <Route exact path="/" component={SplashContainer} />
        <Scoreboard />
  </div>
);

export default App;