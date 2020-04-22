// src/components/app.js

import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import {
  Route,
  // Redirect,
  // withRouter,
  // Switch, 
} from 'react-router-dom';

import SplashContainer from './splash/splash_container';
import TesterContainer from './test_component/tester_container'; 



const App = () => (
  <div>
    <Route exact path="/tester" component={TesterContainer}/>
   
    <Route exact path="/" component={SplashContainer} />
  </div>
);

export default App;