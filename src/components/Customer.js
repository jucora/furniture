/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  render() {
    const { user, loggedInStatus, history, location } = this.props;

    return loggedInStatus === 'LOGGED_IN' ? (
      <div className="track">
        <h2 className="trackTitle">{user.email}</h2>
        <h2 className="trackTitle">Your Role: {user.role}</h2>
        <Person userType={location.userType} />
      </div>
    ) : (
      (history.push('/'), true)
    );
  }
}

Customer.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  loggedInStatus: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Customer;
