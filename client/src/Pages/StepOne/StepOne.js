import React, { Component } from "react";
import {
  Form,
  Button,
  Segment,
  Grid,
  Header,
  Icon,
  Modal
} from "semantic-ui-react";

class StepOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leerlingnummer: "",
      geboortedatum: "",
      student: ""
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const context = this;

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
        console.log(response);
      })
      .then(function(response) {
        console.log(response);
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
      <div className="login-form">
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="green" textAlign="center">
              <Icon name="building" /> Voer hier je gegevens in
            </Header>
            <Form size="large" onSubmit={this.handleSubmit} method="POST">
              <Segment stacked>
                <Form.Input
                  onChange={this.onChange}
                  value={this.state.leerlingnummer}
                  name="leerlingnummer"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Leerlingnummer"
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
                    <Button color="green" fluid size="large">
                      Login
                    </Button>
                  }
                  basic
                >
                  <Header icon="archive" content="Archive Old Messages" />
                  <Modal.Content>
                    <p>Ben jij {this.state.student}</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button basic color="red" inverted>
                      <Icon name="remove" /> No
                    </Button>
                    <Button color="green" inverted>
                      <Icon name="checkmark" /> Yes
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        {this.state.student}
      </div>
    );
  }
}

export default StepOne;
