import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [] };
  }

  componentDidMount() {
    fetch("/users/students")
      .then(response => response.json())
      .then(students => this.setState({ students: students }));
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.students.map(student => (
            <li>
              Naam: {student.Roepnaam} {student.Achternaam} Stamgroep:{" "}
              {student.Stamgroep} Geboortedatum: {student.Geboortedatum}{" "}
              Leerlingnummer: {student.Leerlingnummer}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Register;
