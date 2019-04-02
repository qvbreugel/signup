import React, { Component } from "react";
import {
  Button,
  Container,
  Dropdown,
  Icon,
  Message,
  Segment,
  Table
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";

import "./StepTwo.css";

const keuzes = [];

class StepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leerlingnummer: "",
      beroepen: [],
      value: "",
      moveToStepThree: false,
      error: false,
      redirectHome: false
    };
    this.moveToStepThree = this.moveToStepThree.bind(this);
  }

  handleChange = (e, { value }) => this.setState({ value });

  moveToStepThree() {
    const context = this;

    this.setState({ error: false });
    if (this.state.value.length !== 3) {
      this.setState({ error: true });
    } else {
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
  }

  componentDidMount() {
    if (typeof this.props.location.state == "undefined") {
      this.setState({ redirectHome: true });
    } else {
      this.setState({
        leerlingnummer: this.props.location.state.leerlingnummer
      });

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
  }

  render() {
    const {
      beroepen,
      error,
      leerlingnummer,
      moveToStepThree,
      redirectHome,
      value
    } = this.state;
    return (
      <Container>
        {redirectHome ? (
          <Redirect to={{ pathname: "/", state: { navigationError: true } }} />
        ) : (
          ""
        )}
        {moveToStepThree ? (
          <Redirect
            to={{
              pathname: "/three",
              state: { leerlingnummer: leerlingnummer }
            }}
          />
        ) : (
          <Segment.Group className="top">
            <Segment>
              <h1>Beroepenmarkt</h1>
            </Segment>
            <Segment.Group>
              <Segment>
                <h4>
                  Je moet drie beroepen kiezen die je zou willen bijwonen. Voor
                  jou zijn de volgende beroepen beschikbaar:
                </h4>
              </Segment>
              <Segment>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Beroep</Table.HeaderCell>
                      <Table.HeaderCell>Gepresenteerd door</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {beroepen.map(beroep => (
                      <Table.Row>
                        <Table.Cell>{beroep.beroep}</Table.Cell>
                        <Table.Cell>{beroep.presentator}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Segment>
              <Segment>
                <h2>Welke beroepen wil je bijwonen?</h2>
                {error ? (
                  <Message negative>
                    <p>Je moet drie keuzes opgeven</p>
                  </Message>
                ) : (
                  ""
                )}
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
