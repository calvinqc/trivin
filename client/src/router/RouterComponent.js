import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import RoutesComponent from './RoutesComponent';

class RouterComponent extends Component {
  render() {
    const user = this.props.user || {};
    return (
      <Router basename="/">
        <div>
          <RoutesComponent user={user} />
        </div>
      </Router>
    );
  }
}
export default connect()(RouterComponent);
