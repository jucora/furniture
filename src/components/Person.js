/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import React from 'react';
import { Link } from 'react-router-dom';
import Api from '../utils/api';

const customerImage = require('../img/customer.jpg');

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
    };
  }

  componentDidMount() {
    const { userType } = this.props;
    if (userType === 'employee') {
      Api.getUsers()
        .then((response) => {
          console.warn('res', response);
          this.setState({ people: response.data.users });
        })
        .catch((error) => {
          console.error('error', error);
        });
    } else if (userType === 'customer') {
      Api.getCustomers()
        .then((response) => {
          this.setState({ people: response.data.currentCustomers });
        })
        .catch((error) => {
          console.error('error', error);
        });
    }
  }

  render() {
    const { people } = this.state;
    return (
      <div className="employeeContainer">
        {people.map((person, index) => (
          <div key={person.id} className="skill">
            <Link
              key={person.id}
              to={{
                pathname: `detail/${index}`,
                state: {
                  personName: person.name,
                  person,
                },
              }}
            >
              <div style={{ width: '100%', textAlign: 'center' }}>
                <img
                  style={{ width: '10%' }}
                  src={customerImage}
                  alt="Customer"
                />
              </div>
              <h2 key={person.name}>
                <p>{person.email}</p>
              </h2>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Person;
