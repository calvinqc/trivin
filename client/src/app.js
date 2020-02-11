import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RouterComponent from './router/RouterComponent';
import { USER_TOKEN, USER_TOKEN_IS_EMPTY } from './constant';

class App extends Component {
  render() {
    const user = localStorage.getItem(USER_TOKEN) || USER_TOKEN_IS_EMPTY;
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
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
