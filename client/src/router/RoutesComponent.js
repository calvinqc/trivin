import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Page
import LandingPage from '../page/LandingPage';
import LoginPage from '../page/LoginPage';
import HomePage from '../page/HomePage';
import { USER_TOKEN_IS_EMPTY } from '../constant';

class RoutesComponent extends Component {
  privateComponent(component) {
    const user = this.props.user || {};
    if (user !== USER_TOKEN_IS_EMPTY) {
      return component;
    }
    return LoginPage;
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/home" component={this.privateComponent(HomePage)} />
      </div>
    );
  }
}
export default RoutesComponent;
