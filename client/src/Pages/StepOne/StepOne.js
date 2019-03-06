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
      studentName: "",
      studentSurname: "",
      modalOpen: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

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
        return response.json();
      })
      .then(function(response) {
        context.setState({
          studentName: response["Roepnaam"],
          studentSurname: response["Achternaam"]
        });
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
                    <Button
                      color="green"
                      fluid
                      size="large"
                      onClick={this.handleOpen}
                    >
                      Login
                    </Button>
                  }
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                  basic
                >
                  <Header icon="archive" content="Archive Old Messages" />
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
                    <Button color="green" inverted>
                      <Icon name="checkmark" /> Ja, verder
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
