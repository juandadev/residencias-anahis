import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { store } from '../context/store';
import { Home, NotFound, Login } from '../components/containers';

export default function Router() {
  const { state } = useContext(store);
  const { session } = state;
  console.log(session);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          {session.isLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>

        <Route exact path="/">
          {session.isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
