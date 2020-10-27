/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import React from "react";
import PropTypes from "prop-types";
import Employee from "./Employee";
import Api from "../utils/api";

class Track extends React.Component {
  constructor() {
    super();
    this.state = { total: 0 };
  }

  componentDidMount() {
    const { loggedInStatus } = this.props;
    if (loggedInStatus === "LOGGED_IN") {
      Api.getMeasures()
        .then((response) => {
          this.setState({
            total: response.data.totalScore[0].total,
          });
        })
        .catch((error) => {
          console.error("error", error);
        });
    }
  }

  render() {
    const { user, loggedInStatus, history } = this.props;
    const { total } = this.state;
    return loggedInStatus === "LOGGED_IN" ? (
      <div className="track">
        <h2 className="trackTitle">{user.email}</h2>
        <div className="totalScore">
          <div>
            <h2>Total Hours</h2>
            <p>{total}</p>
          </div>
        </div>
        <Employee />
      </div>
    ) : (
      (history.push("/"), true)
    );
  }
}

Track.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  loggedInStatus: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Track;
