import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home, NotFound, Login } from '../components/containers';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          {/* {session.isLoggedIn ? <Redirect to="/" /> : <Login />} */}
          <Login />
        </Route>

        <Route exact path="/">
          {/* {session.isLoggedIn ? <Home /> : <Redirect to="/login" />} */}
          <Home />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
