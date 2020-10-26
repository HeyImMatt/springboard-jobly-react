import React from "react";
import { Switch, Route } from "react-router-dom";
import Companies from './Companies';
import Company from './Company';
import Home from './Home';
import Jobs from './Jobs';
import Login from './Login';
import Profile from './Profile';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/companies">
        <Companies />
      </Route>
      <Route exact path="/companies/:id">
        <Company />
      </Route>
      <Route exact path="/jobs">
        <Jobs />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
    </Switch>
  );
}
