import React, { Component } from "react";
import {
  Form,
  Button,
  Container,
  Segment,
  Header,
  Message,
  Icon,
  Modal
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import "./StepOne.css";

class StepOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leerlingnummer: "",
      geboortedatum: "",
      studentName: "",
      studentSurname: "",
      modalOpen: false,
      moveToStepTwo: false,
      error: false,
      navigationError: false,
      errorMessage: ""
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props.location.state);
    if (typeof this.props.location.state !== "undefined") {
      this.setState({
        error: true,
        errorMessage:
          "Let op dat je geen pagina's vooruit of achteruit kan gaan. Alles moet in één keer ingevuld worden."
      });
    }
  }

  moveToStepTwo = () => this.setState({ moveToStepTwo: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleSubmit(event) {
    const context = this;
    context.setState({ error: false });

    event.preventDefault();

    const data = {
      leerlingnummer: this.state.leerlingnummer,
      geboortedatum: this.state.geboortedatum
    };

    fetch("/students/login", {
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
        console.log(response["error"]);
        if (response["error"]) {
          context.setState({
            error: true,
            errorMessage:
              "Controleer of de juiste gegevens hebt ingevuld. Als je problemen blijft houden, neem contact op met je teamleider"
          });
        } else if (response["registered"]) {
          context.setState({
            error: true,
            errorMessage:
              "Je hebt je al ingeschreven. Als je je keuzes wilt wijzigen, neem contact op met je teamleider"
          });
        } else {
          context.setState({
            studentName: response["Roepnaam"],
            studentSurname: response["Achternaam"],
            modalOpen: true
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Container>
        {this.state.moveToStepTwo ? (
          <Redirect
            to={{
              pathname: "/two",
              state: { leerlingnummer: this.state.leerlingnummer }
            }}
          />
        ) : (
          <Segment.Group className="top">
            <Segment>
              <h1>Beroepenmarkt</h1>
            </Segment>
            <Segment.Group>
              <Segment>
                <p>Voer hier je gegevens in</p>
              </Segment>
              <Form size="large" onSubmit={this.handleSubmit} method="POST">
                <Segment>
                  {this.state.error ? (
                    <Message negative>
                      <Message.Header>Er is iets fout gegaan</Message.Header>
                      <p>{this.state.errorMessage}</p>
                    </Message>
                  ) : (
                    ""
                  )}
                  <Form.Input
                    onChange={this.onChange}
                    value={this.state.leerlingnummer}
                    name="leerlingnummer"
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Leerlingnummer"
                    error={this.state.leerlingnummerError}
                  />
                  <Form.Input
                    onChange={this.onChange}
                    value={this.state.geboortedatum}
                    name="geboortedatum"
                    fluid
                    icon="calendar alternate"
                    iconPosition="left"
                    placeholder="Geboortedatum (DD-MM-YYYY)"
                  />
                  <Modal
                    trigger={
                      <Button
                        color="green"
                        fluid
                        size="large"
                        onClick={this.handleOpen}
                        disabled={
                          !this.state.leerlingnummer ||
                          !this.state.geboortedatum
                        }
                      >
                        Login
                      </Button>
                    }
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    basic
                  >
                    <Header
                      icon="check circle outline"
                      content="Verifieer dat jij het bent"
                    />
                    <Modal.Content>
                      <p>
                        Ben jij{" "}
                        {this.state.studentName +
                          " " +
                          this.state.studentSurname +
                          "?"}
                      </p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        basic
                        color="red"
                        inverted
                        onClick={this.handleClose}
                      >
                        <Icon name="remove" /> Nee, wijzig mijn gegevens
                      </Button>
                      <Button
                        color="green"
                        inverted
                        onClick={this.moveToStepTwo}
                      >
                        <Icon name="checkmark" /> Ja, verder
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </Segment>
              </Form>
            </Segment.Group>
          </Segment.Group>
        )}
      </Container>
    );
  }
}

export default StepOne;
