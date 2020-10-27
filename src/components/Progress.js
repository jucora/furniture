/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Api from '../utils/api';

class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [],
        datasets: [{}],
      },
    };
  }

  componentDidMount() {
    const { loggedInStatus } = this.props;
    if (loggedInStatus === 'LOGGED_IN') {
      Api.getSkills()
        .then(response => {
          const skills = [];
          const values = [];

          response.data.currentSkills.map(skill => {
            skills.push(skill.name);
            values.push(skill.sum);
            return true;
          });
          this.setState({
            data: {
              labels: skills,
              datasets: [
                {
                  label: 'Your Progress',
                  data: values,
                  backgroundColor: '#ADDC91',
                },
              ],
            },
          });
        })
        .catch(error => {
          console.error('error', error);
        });
    }
  }

  render() {
    const { loggedInStatus, history } = this.props;
    const { data } = this.state;
    return loggedInStatus === 'LOGGED_IN' ? (
      <div
        style={{
          position: 'relative',
          width: '60%',
          height: 'auto',
          margin: 'auto',
        }}
      >
        <Bar
          options={{
            responsive: true,
          }}
          data={data}
        />
      </div>
    ) : (
      (history.push('/'), true)
    );
  }
}

Progress.propTypes = {
  loggedInStatus: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Progress;
