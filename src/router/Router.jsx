import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home, NotFound, Login } from '../components/containers';

function Router({ session }) {
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

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps, null)(Router);
