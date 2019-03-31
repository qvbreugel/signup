import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import StepOne from "./Pages/StepOne/StepOne";
import StepTwo from "./Pages/StepTwo/StepTwo";

const studentContext = React.createContext("00000");

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={StepOne} />
            <Route path="/two" exact component={StepTwo} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
