import React, { Component } from "react";
import { Button, Container, Dropdown, Icon, Segment } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

const keuzes = [];

class StepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leerlingnummer: this.props.location.state.leerlingnummer,
      beroepen: [],
      value: "",
      moveToStepThree: false
    };
    this.moveToStepThree = this.moveToStepThree.bind(this);
  }

  handleChange = (e, { value }) => this.setState({ value });

  moveToStepThree() {
    const context = this;

    console.log(this.state.value);

    const data = {
      keuze_1: this.state.value[0],
      keuze_2: this.state.value[1],
      keuze_3: this.state.value[2],
      leerlingnummer: this.state.leerlingnummer
    };

    fetch("/students/keuze", {
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
      .then(function() {
        context.setState({
          moveToStepThree: true
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  componentDidMount() {
    const context = this;

    fetch("/students/beroepen", {
      method: "get"
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(response) {
        console.log(response);
        context.setState({
          beroepen: response
        });
        response.map(beroep =>
          keuzes.push({
            key: beroep.id,
            text: beroep.beroep + ", " + beroep.presentator,
            value: beroep.beroep
          })
        );
        console.log(keuzes);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    const { beroepen, leerlingnummer, moveToStepThree, value } = this.state;
    return (
      <Container>
        {moveToStepThree ? (
          <Redirect
            to={{
              pathname: "/three",
              state: { leerlingnummer: leerlingnummer }
            }}
          />
        ) : (
          <Segment.Group>
            <Segment>
              <h1>Beroepenmarkt</h1>
            </Segment>
            <Segment.Group>
              <Segment>
                <p>
                  Voor leerling met leerling nummer: {leerlingnummer} zijn de
                  volgende vakken beschikbaar.
                </p>
              </Segment>
              <Segment>
                {beroepen.map(beroep => (
                  <div key={beroep.id}>
                    {beroep.beroep}
                    {beroep.presentator}
                  </div>
                ))}
              </Segment>
              <Segment>
                <h2>Welke beroepen wil je bijwonen?</h2>
                <Dropdown
                  onChange={this.handleChange}
                  options={keuzes}
                  placeholder="Beroepen"
                  multiple
                  selection
                  value={value}
                />
                <Button floated="right" animated onClick={this.moveToStepThree}>
                  <Button.Content visible>Volgende</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
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

export default StepTwo;
