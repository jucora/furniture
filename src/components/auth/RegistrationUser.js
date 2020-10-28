/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import React from 'react';
import PropType from 'prop-types';
import Api from '../../utils/api';

export default class RegistrationUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      role: '',
      password: '',
      passwordConfirmation: '',
      errors: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    const { handleSuccessfulAuth } = this.props;
    const { email, role, password, passwordConfirmation } = this.state;

    e.preventDefault();
    Api.newUser(email, role, password, passwordConfirmation)
      .then((response) => {
        if (response.data.errors) {
          this.setState({ errors: response.data.errors });
        }
        if (response.data.user) {
          localStorage.setItem('token', JSON.stringify(response.data.jwt));
          handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        console.error('Registration error', error);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { email, role, password, passwordConfirmation, errors } = this.state;
    return (
      <div className="newForm">
        <form onSubmit={this.handleSubmit}>
          <h2>Add Employee</h2>
          {errors.map((error) => (
            <h2 key={error} className="error">
              {error}
            </h2>
          ))}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="role"
            placeholder="Role"
            value={role}
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

          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Password confirmation"
            value={passwordConfirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

RegistrationUser.propTypes = {
  handleSuccessfulAuth: PropType.func,
};
