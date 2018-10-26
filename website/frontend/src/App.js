import React, { Component } from "react";
import Home from "./components/Home";
import { Switch, Route, withRouter } from "react-router-dom";
import AppBar from "./components/AppBar";
import SearchResults from "./containers/SearchResults";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <Switch>
          <Route exact path="/search" component={SearchResults} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
