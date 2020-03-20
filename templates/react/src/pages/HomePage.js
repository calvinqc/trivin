import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { USER_TOKEN } from '../constants';
import { logout } from '../store/actions/auth.action';

import Landing from '../components/Landing';
import Home from '../components/Home';

class HomePage extends Component {
  onClick = e => {
    e.preventDefault();
    localStorage.removeItem(USER_TOKEN);
    this.props.logout();
  };

  render() {
    const { user } = this.props || {};
    return user && user.token ? (
      <Home logout={e => this.onClick(e)} />
    ) : (
      <Landing />
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
  return bindActionCreators({ logout }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);
