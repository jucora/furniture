import axios from 'axios';

const Api = (() => {
  const getUsers = () =>
    new Promise((resolve) => {
      axios
        .get('http://localhost:3001/registrations', {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('token')),
          },
        })
        .then((response) => {
          resolve(response);
        });
    });
  const getCustomers = () =>
    new Promise((resolve) => {
      axios
        .get('http://localhost:3001/customers', {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('token')),
          },
        })
        .then((response) => {
          resolve(response);
        });
    });
  const destroyUser = (userId) =>
    new Promise((resolve) => {
      axios
        .delete(`http://localhost:3001/users/destroy/${userId}`)
        .then((response) => {
          resolve(response);
        });
    });

  const newUser = (email, role, password, passwordConfirmation) =>
    new Promise((resolve) => {
      axios
        .post('http://localhost:3001/registrations', {
          user: {
            email,
            role,
            password,
            password_confirmation: passwordConfirmation,
          },
        })
        .then((response) => {
          resolve(response);
        });
    });

  const newCustomer = (name, email, token) =>
    new Promise((resolve) => {
      axios
        .post('http://localhost:3001/customers', {
          newCustomer: {
            name,
            email,
            token,
          },
        })
        .then((response) => {
          resolve(response);
        });
    });

  const newSession = (email, password) =>
    new Promise((resolve) => {
      axios
        .post('http://localhost:3001/sessions', {
          user: {
            email,
            password,
          },
        })
        .then((response) => {
          resolve(response);
        });
    });
  const loggedIn = () =>
    new Promise((resolve) => {
      axios
        .get('http://localhost:3001/logged_in', {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('token')),
          },
        })
        .then((response) => {
          resolve(response);
        });
    });

  return {
    getUsers,
    getCustomers,
    destroyUser,
    newUser,
    newCustomer,
    newSession,
    loggedIn,
  };
})();

export default Api;
