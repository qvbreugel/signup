import React, { Component } from "react";
import { Container, Segment } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

import "./StepFour.css";

class StepFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leerling: "",
      redirectHome: false
    };
  }

  componentDidMount() {
    if (typeof this.props.location.state == "undefined") {
      this.setState({ redirectHome: true });
    } else {
      this.setState({
        leerlingnummer: this.props.location.state.leerling
      });
    }
  }

  render() {
    const { leerling, redirectHome } = this.state;
    return (
      <Container>
        {redirectHome ? (
          <Redirect to={{ pathname: "/", state: { navigationError: true } }} />
        ) : (
          ""
        )}
        <Segment.Group className="top">
          <Segment>
            <h1>Beroepenmarkt</h1>
          </Segment>
          <Segment.Group>
            <Segment>
              <p>
                Gefeliciteerd {leerling}, het is je gelukt om in te schrijven
                voor de beroepenmarkt!
              </p>
            </Segment>
          </Segment.Group>
        </Segment.Group>
      </Container>
    );
  }
}

export default StepFour;
