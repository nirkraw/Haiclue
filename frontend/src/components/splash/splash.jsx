// src/components/main/main_page.js

import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';
import React from 'react';
import {
  AuthRoute,
  // ProtectedRoute
} from '../../util/route_util';


class Splash extends React.Component {
  
  render() {

    return (
      <div>
        <h1>Haiclue</h1>
        <AuthRoute component={SignupFormContainer} />
        <AuthRoute component={LoginFormContainer} />
      </div>
    );
  }
}

export default Splash;