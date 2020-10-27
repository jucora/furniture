/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import React from "react";
import PropType from "prop-types";
import Api from "../../utils/api";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    const { handleSuccessfulAuth } = this.props;
    const { email, password } = this.state;

    e.preventDefault();
    Api.newSession(email, password)
      .then((response) => {
        if (response.data.error) {
          this.setState({ error: response.data.error });
        }
        if (response.data.logged_in) {
          localStorage.setItem("token", JSON.stringify(response.data.jwt));
          handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        console.error("Login error", error);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <h2>Iniciar Sesión</h2>
          <h2 className="error">{error}</h2>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  handleSuccessfulAuth: PropType.func.isRequired,
};
