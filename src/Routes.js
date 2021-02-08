import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewPost from "./containers/NewPost";
import Posts from "./containers/Posts";
import LandingPage from "./containers/LandingPage";
import Donate from "./containers/Donate";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/donate">
        <Donate />
      </Route>

      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/posts/new">
        <NewPost />
      </Route>
      <Route exact path="/posts/:id">
        <Posts />
      </Route>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
