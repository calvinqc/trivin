import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { USER_TOKEN } from '../constant';
import { logout } from '../store/action/auth.action';

import Landing from '../component/Landing';
import Home from '../component/Home';

class HomePage extends Component {
  onClick = e => {
    e.preventDefault();
    localStorage.removeItem(USER_TOKEN);
    this.props.logout();
  };

  render() {
    const user = this.props.user || {};
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
