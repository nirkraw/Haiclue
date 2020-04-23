import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import {
  Route,
} from "react-router-dom";
import SplashContainer from "./splash/splash_container";
import GameContainer from "./game_container";
import CreateRoomContainer from "./socket_test/create_room_container";
import "./css/index.css";


const App = () => (
  <div className="container">
    <AuthRoute exact path="/" component={SplashContainer} />
    <ProtectedRoute exact path="/create-room" component={CreateRoomContainer} />
    <ProtectedRoute path="/game" component={GameContainer} />
  </div>
);

export default App;
