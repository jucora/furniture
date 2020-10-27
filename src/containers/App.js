/* eslint-disable react/jsx-props-no-spreading */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import Home from "../components/Home";
import Track from "../components/Track";
import { changeLoggedInStatus, setCurrentUser } from "../actions/index";
import NavBar from "../components/NavBar";
import EmployeeForm from "./EmployeeForm";
import Detail from "../components/Detail";
import Progress from "../components/Progress";
import More from "./More";
import Login from "../components/auth/Login";
import Registration from "../components/auth/Registration";
import Header from "../components/Header";
import Api from "../utils/api";

class App extends React.Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = { contentLoaded: false };
  }

  componentDidMount() {
    const { changeLoggedInStatus, setCurrentUser, loggedInStatus } = this.props;
    Api.loggedIn()
      .then((response) => {
        if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
          changeLoggedInStatus("LOGGED_IN");
          setCurrentUser(response.data.current_user);
        } else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN") {
          changeLoggedInStatus("NOT_LOGGED_IN");
          setCurrentUser({});
        }
        this.setState({ contentLoaded: true });
      })
      .catch((error) => {
        console.error("check login error", error);
      });
  }

  handleLogin(data) {
    const { changeLoggedInStatus, setCurrentUser } = this.props;
    changeLoggedInStatus("LOGGED_IN");
    setCurrentUser(data.user);
  }

  handleLogout() {
    localStorage.removeItem("token");
    const { changeLoggedInStatus, setCurrentUser } = this.props;
    changeLoggedInStatus("NOT_LOGGED_IN");
    setCurrentUser({});
  }

  render() {
    const { loggedInStatus, user } = this.props;
    const { contentLoaded } = this.state;
    return contentLoaded ? (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Registration} />
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={loggedInStatus}
                  handleLogout={this.handleLogout}
                />
              )}
            />
            <Route
              exact
              path="/employeeForm"
              render={(props) => (
                <EmployeeForm {...props} loggedInStatus={loggedInStatus} />
              )}
            />
            <Route
              exact
              path="/track"
              render={(props) => (
                <Track user={user} {...props} loggedInStatus={loggedInStatus} />
              )}
            />

            <Route
              path="/detail/:id"
              render={(props) => (
                <Detail {...props} loggedInStatus={loggedInStatus} />
              )}
            />
            <Route
              path="/progress"
              render={(props) => (
                <Progress {...props} loggedInStatus={loggedInStatus} />
              )}
            />
            <Route
              path="/more"
              render={(props) => (
                <More
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={loggedInStatus}
                  handleLogout={this.handleLogout}
                />
              )}
            />
          </Switch>
          {loggedInStatus === "LOGGED_IN" ? <NavBar /> : null}
        </BrowserRouter>
      </div>
    ) : null;
  }
}

App.propTypes = {
  changeLoggedInStatus: Proptypes.func.isRequired,
  setCurrentUser: Proptypes.func.isRequired,
  loggedInStatus: Proptypes.string.isRequired,
  user: Proptypes.objectOf(Proptypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  loggedInStatus: state.musicianReducer.loggedInStatus,
  user: state.musicianReducer.user,
  token: state.musicianReducer.token,
});

const matchDispatchToProps = (dispatch) => ({
  changeLoggedInStatus: (newStatus) => {
    dispatch(changeLoggedInStatus(newStatus));
  },
  setCurrentUser: (user) => {
    dispatch(setCurrentUser(user));
  },
});

export default connect(mapStateToProps, matchDispatchToProps)(App);
