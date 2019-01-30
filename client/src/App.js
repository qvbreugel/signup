import React, { Component } from "react";
import "./App.css";
import Students from "./Components/Students";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import StepOne from "./Pages/StepOne/StepOne";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={StepOne} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
