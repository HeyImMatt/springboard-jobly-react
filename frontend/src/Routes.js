import React from "react";
import { Switch, Route } from "react-router-dom";
import Companies from './Companies';
import Company from './Company';
import Home from './Home';
import Jobs from './Jobs';
import Login from './Login';
import Profile from './Profile';
import PrivateRoute from "./PrivateRoute";

export default function Routes({ setToken }) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login setToken={setToken} />
      </Route>
      <PrivateRoute exact path="/companies">
        <Companies />
      </PrivateRoute>
      <PrivateRoute exact path="/companies/:handle">
        <Company />
      </PrivateRoute>
      <PrivateRoute exact path="/jobs">
        <Jobs />
      </PrivateRoute>
      <PrivateRoute exact path="/profile">
        <Profile />
      </PrivateRoute>
    </Switch>
  );
}
