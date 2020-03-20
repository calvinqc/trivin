import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={{ height: '75vh' }} className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Landing Page </b>
          </h4>
          <br />
          <div className="col s6">
            <Link
              to="/login"
              style={{
                width: '140px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
