import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import LogIn_box from './container/LogIn_box';

function App(props) {
  return (
    <ConnectedRouter history = {props.history}>
        <div className="App">
        <Switch>
          <Route path = '/login' exact component = {LogIn_box} />
          <Redirect path='*' to='/login' />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
