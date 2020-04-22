import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import { fetchTiles} from './actions/tile_actions'


document.addEventListener('DOMContentLoaded', () => {
      let store;


      if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        const decodedUser = jwt_decode(localStorage.jwtToken);
        const preloadedState = {
          session: {
            isAuthenticated: true,
            user: decodedUser// id
          }
        };

        store = configureStore(preloadedState); 
        
        
        const currentTime = Date.now() / 1000;
        
        // If the user's token has expired
        if (decodedUser.exp < currentTime) {
          // Logout the user and redirect to the login page
          store.dispatch(logout());
          window.location.href = '/login';
        }
      } else {
        // If this is a first time user, start with an empty store
        store = configureStore({});
      }
      
      window.fetchTiles = fetchTiles;
      window.store = store;
      window.getState = store.getState;
      window.dispatch = store.dispatch;

        const root = document.getElementById('root');
        ReactDOM.render( <Root store = { store }/>, root);
      }
);
      
      
      
      
  
      
      
