import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";
import SplashContainer from "./splash/splash_container";
import Timer from "./timer/timer";
import CreateRoomContainer from "./create_room/create_room_container";
import ExtInstructions from "./splash/external-instructions";
import "./css/index.css";

const App = () => (
  <div className="container">
    <Route exact path="/timer" component={Timer} />
    <Switch>
      <Route exact path="/instructions" component={ExtInstructions} />
      <AuthRoute path="/" component={SplashContainer} />
    </Switch>
    <ProtectedRoute path="/game" component={CreateRoomContainer} />
  </div>
);

export default App;
