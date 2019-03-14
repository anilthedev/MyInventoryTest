import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Layout from './Layout';

class MainApp extends Component {
  render() {
    return (
        <HashRouter>
          <Switch>
            <Route path="/" name="Home" component={Layout} />
          </Switch>
        </HashRouter>
    );
  }
}

export default MainApp;