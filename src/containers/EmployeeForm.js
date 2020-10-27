/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Api from "../utils/api";

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", errors: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { name } = this.state;
    const { history } = this.props;
    e.preventDefault();

    Api.addEmployee(name)
      .then((response) => {
        if (response.data.errors) {
          this.setState({ errors: response.data.errors });
        } else {
          history.push("/track");
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { name, errors } = this.state;
    const { loggedInStatus, history } = this.props;
    return loggedInStatus === "LOGGED_IN" ? (
      <div className="newSkillForm">
        <form onSubmit={this.handleSubmit}>
          <h1>Nuevo Empleado</h1>
          <h2 className="error">{errors}</h2>
          <input
            type="text"
            name="name"
            placeholder="Skill Name"
            value={name}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Añadir Empleado</button>
        </form>
      </div>
    ) : (
      (history.push("/"), true)
    );
  }
}

EmployeeForm.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  loggedInStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.musicianReducer.user,
});

export default connect(mapStateToProps, null)(EmployeeForm);
