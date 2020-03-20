import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RouterComponent from './router/RouterComponent';

import { setUserToken } from './store/actions/auth.action';
import { USER_TOKEN } from './constants';

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem(USER_TOKEN);
    if (token) {
      this.props.setUserToken({ token });
    }
  }

  render() {
    const { user } = this.props || {};
    return (
      <div>
        <RouterComponent user={user} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ setUserToken }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);
