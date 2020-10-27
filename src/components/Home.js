/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import Login from './auth/Login';
import Registration from './auth/Registration';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    const { history, handleLogin } = this.props;
    handleLogin(data);
    history.push('/track');
  }

  handleLogoutClick() {
    const { handleLogout } = this.props;
    handleLogout();
  }

  render() {
    const { loggedInStatus, history } = this.props;
    return loggedInStatus === 'NOT_LOGGED_IN' ? (
      <div className="home">
        <div>
          <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
          <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        </div>
      </div>
    ) : (
      (history.push('/track'), true)
    );
  }
}

Home.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  loggedInStatus: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
