import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import StepOne from "./Pages/StepOne/StepOne";
import StepTwo from "./Pages/StepTwo/StepTwo";
import StepThree from "./Pages/StepThree/StepThree";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={StepOne} />
            <Route path="/two" exact component={StepTwo} />
            <Route path="/three" exact component={StepThree} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
