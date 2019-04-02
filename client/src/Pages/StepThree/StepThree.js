import React, { Component } from "react";
import { Button, Container, Icon, Segment } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

import "./StepThree.css";

class StepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leerlingnummer: "",
      leerling: {},
      moveToStepFour: false,
      redirectHome: false
    };
    this.moveToStepFour = this.moveToStepFour.bind(this);
  }

  handleChange = (e, { value }) => this.setState({ value });

  moveToStepFour() {
    this.setState({ moveToStepFour: true });
    const context = this;

    const data = { leerlingnummer: this.props.location.state.leerlingnummer };

    fetch("/students/plaatsen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(response) {})
      .catch(function(err) {
        console.log(err);
      });
  }

  componentDidMount() {
    if (typeof this.props.location.state == "undefined") {
      this.setState({ redirectHome: true });
    } else {
      this.setState({
        leerlingnummer: this.props.location.state.leerlingnummer
      });
      console.log(this.props.location.state.leerlingnummer);

      const context = this;

      const data = { leerlingnummer: this.props.location.state.leerlingnummer };

      fetch("/students/gegevens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(function(response) {
          context.setState({
            leerling: response[0]
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }

  render() {
    const { leerling, moveToStepFour, redirectHome } = this.state;
    return (
      <Container>
        {redirectHome ? (
          <Redirect to={{ pathname: "/", state: { navigationError: true } }} />
        ) : (
          ""
        )}
        {moveToStepFour ? (
          <Redirect
            to={{
              pathname: "/four",
              state: { leerling: leerling["Roepnaam"] }
            }}
          />
        ) : (
          <Segment.Group className="top">
            <Segment>
              <h1>Beroepenmarkt</h1>
            </Segment>
            <Segment.Group>
              <Segment>
                <p>Kloppen de volgende gegevens?</p>
              </Segment>
              <Segment>
                <h4>
                  Naam: {leerling["Roepnaam"]} {leerling["Achternaam"]}{" "}
                </h4>
                <h4>Leerlingnummer: {leerling["Leerlingnummer"]} </h4>
                <h4>Keuze 1: {leerling["Beroep_1"]} </h4>
                <h4>Keuze 2: {leerling["Beroep_2"]} </h4>
                <h4>Keuze 3: {leerling["Beroep_3"]} </h4>
              </Segment>
              <Segment>
                <Button
                  fluid
                  animated
                  onClick={this.moveToStepFour}
                  basic
                  color="green"
                >
                  <Button.Content visible>
                    Ja, dit klopt. Schrijf me in!
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name="check" />
                  </Button.Content>
                </Button>
              </Segment>
            </Segment.Group>
          </Segment.Group>
        )}
      </Container>
    );
  }
}

export default StepThree;
