import React, { Component } from "react";
import "./App.css";
import Students from "./Components/Students";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Students</h1>
        <Students />
      </div>
    );
  }
}

export default App;
