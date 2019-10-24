import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import './App.css';
import Home from './components/Home';
import store from './redux/stores/configStore';
import * as Constants from './constants';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Switch>
              <Route path={ Constants.HOST_HOME } component={Home} />
              <Redirect to={{pathname: Constants.HOST_HOME}} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
