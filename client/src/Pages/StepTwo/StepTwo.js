import React, { Component } from "react";

class StepTwo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Vakkenmarkt</h1>
        <p>
          Voor leerling met leerling nummer:{" "}
          {this.props.location.state.leerlingnummer} zijn de volgende vakken
          beschikbaar.
        </p>
      </div>
    );
  }
}

export default StepTwo;
