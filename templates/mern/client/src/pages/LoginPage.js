import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

import { login } from '../api/login.api';
import Login from '../components/Login.js';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onClick = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  };

  render() {
    const { email, password } = { ...this.state };
    const { user } = this.props || {};
    const { token } = user;

    return token ? (
      <Redirect to="/" user={user} />
    ) : (
      <Login
        onChange={e => this.onChange(e)}
        onClick={e => this.onClick(e)}
        email={email}
        password={password}
      />
    );
  }
}

// Store
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withRouter(LoginPage));
