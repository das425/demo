import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import LogIn_box from './container/LogIn_box';
import Article_List from './container/Article_list';

function App(props) {
  return (
    <ConnectedRouter history = {props.history}>
        <div className="App">
        <Switch>
          <Route path = '/login' exact component = {LogIn_box} />
          <Route path = '/articles' exact component = {Article_List} />
          <Redirect path='*' to='/login' />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
