/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const More = props => {
  const {
    handleLogout, loggedInStatus, history, user,
  } = props;
  const handleLogoutClick = () => {
    handleLogout();
  };
  return (
    <div className="moreBox">
      {loggedInStatus === 'LOGGED_IN' ? (
        <>
          <h1>Account</h1>
          <p>
            User:
            {user.email}
          </p>
          <p>
            Your ID:
            {user.id}
          </p>
          <p>
            Registered since:
            {user.created_at}
          </p>

          <button
            className="logoutButton"
            type="button"
            onClick={() => handleLogoutClick()}
          >
            Logout
          </button>

          <div className="author">
            <p>Author: Julian Belmonte</p>
            <p>
              Thank you for your support in this project. I invite you to visit
              my
              {' '}
              <a
                href="https://jucora.github.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                portfolio
              </a>
            </p>
          </div>
        </>
      ) : (
        history.push('/')
      )}
    </div>
  );
};

More.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  loggedInStatus: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  user: state.musicianReducer.user,
});

export default connect(mapStateToProps, null)(More);
