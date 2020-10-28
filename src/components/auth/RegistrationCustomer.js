/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import React from 'react';
import PropType from 'prop-types';
import Api from '../../utils/api';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      errors: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    const { handleSuccessfulAuth } = this.props;
    const { name, email } = this.state;
    const token = localStorage.getItem('token');
    e.preventDefault();
    Api.newCustomer(name, email, JSON.parse(token))
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
    const { name, email, errors } = this.state;
    return (
      <div className="newForm">
        <form onSubmit={this.handleSubmit}>
          <h2>Add Customer</h2>
          {errors.map((error) => (
            <h2 key={error} className="error">
              {error}
            </h2>
          ))}

          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            value={name}
            onChange={this.handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Add Customer</button>
        </form>
      </div>
    );
  }
}

Registration.propTypes = {
  handleSuccessfulAuth: PropType.func,
};
