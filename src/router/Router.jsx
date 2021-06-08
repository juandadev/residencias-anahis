import React, { useContext, Suspense, lazy } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { store } from '../context/store';
// import { Home, NotFound, Login } from '../components/containers';

const Home = lazy(() => import('../components/containers/Home/Home'));
const NotFound = lazy(
  () => import('../components/containers/NotFound/NotFound')
);
const Login = lazy(() => import('../components/containers/Login/Login'));

export default function Router() {
  const { state } = useContext(store);
  const { session } = state;

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Row>
            <Col xs={12} className="d-flex justify-content-center">
              <Spinner animation="grow" variant="primary" />
            </Col>
          </Row>
        }
      >
        <Switch>
          <Route exact path="/login">
            {session.isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>

          <Route path="/dashboard/:tab">
            {session.isLoggedIn ? <Home /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/">
            {session.isLoggedIn ? <Home /> : <Redirect to="/login" />}
          </Route>

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
