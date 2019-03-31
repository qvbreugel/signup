import React, { Component } from "react";
import { Container, Segment } from "semantic-ui-react";

class StepFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leerling: this.props.location.state.leerling
    };
  }

  render() {
    const { leerling } = this.state;
    return (
      <Container>
        <Segment.Group>
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
