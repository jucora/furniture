/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import React from 'react';
import PropTypes, { string } from 'prop-types';
import Api from '../utils/api';

class Detail extends React.Component {
  constructor() {
    super();
    this.state = { score: '', errors: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(skillId) {
    Api.destroySkill(skillId)
      .then(response => {
        if (response) {
          const { history } = this.props;
          history.push('/track');
        }
      })
      .catch(error => {
        console.error('error', error);
      });
  }

  handleSubmit(e) {
    const { location, history } = this.props;
    const { skill } = location.state;
    const { score } = this.state;

    e.preventDefault();
    Api.addMeasure(skill, score)
      .then(response => {
        if (response.data.errors) {
          this.setState({ errors: response.data.errors });
        }
        if (response.data.newScore) {
          history.push('/progress');
        }
      })
      .catch(error => {
        console.error('error', error);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { location, loggedInStatus, history } = this.props;
    /* const { skillName, skill } = location.state; */
    const { score, errors } = this.state;
    return loggedInStatus === 'LOGGED_IN' ? (
      <div className="newScoreForm">
        <form onSubmit={this.handleSubmit}>
          <h1>
            Your Skill:
            {location.state.skillName}
          </h1>
          {errors.map(error => (
            <h2 key={error} className="error">
              {error}
            </h2>
          ))}

          <h2>Hours of study</h2>
          <input
            type="text"
            name="score"
            placeholder="Score"
            value={score}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Add Score</button>
          <br />
          <h2>Delete Skill</h2>
          <button
            type="button"
            onClick={() => this.handleClick(location.state.skill.skill_id)}
            className="deleteSkill"
          >
            Remove
          </button>
        </form>
      </div>
    ) : (
      (history.push('/'), true)
    );
  }
}

Detail.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  loggedInStatus: string.isRequired,
};

export default Detail;
