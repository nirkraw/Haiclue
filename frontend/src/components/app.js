import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import {
  Route,
  // Redirect,
  // withRouter,
  // Switch,
} from "react-router-dom";
import Scoreboard from "../components/target_words/scoreboard";
import MyTargetWord from "./my_target_word/my_target_word";
import TileBank from "./tile_bank/tile_bank";
import CurrentClue from "./current_clue/current_clue";
import SplashContainer from "./splash/splash_container";
import GameContainer from "./game_container";
import TesterContainer from "./test_component/tester_container";
import CreateRoomContainer from "./splash/create_room_container";
import SubmitTestContainer from './submit_test/submit_test_container';
import "./css/index.css";

const App = () => (
  <div className="container">
    <AuthRoute exact path="/" component={SplashContainer} />
    <Route exact path="/tester" component={TesterContainer} />
    <ProtectedRoute exact path ="/create-room" component={CreateRoomContainer} />
    <ProtectedRoute path="/game" component={GameContainer} />
  </div>
);

export default App;
