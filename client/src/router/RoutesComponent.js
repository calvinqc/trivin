import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Page
import LandingPage from '../page/LandingPage';
import LoginPage from '../page/LoginPage';
import HomePage from '../page/HomePage';

class RoutesComponent extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/home" component={HomePage} />
      </div>
    );
  }
}
export default RoutesComponent;
