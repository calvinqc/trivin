import React from 'react';
import { Link } from 'react-router-dom';

const Login = props => {
  return (
    <div className="container">
      <div style={{ marginTop: '4rem' }} className="row">
        <div className="col s8 offset-s2">
          <div className="col s12" style={{ paddingLeft: '11.250px' }}>
            <h4>
              <b>Login</b>
            </h4>
          </div>
          <form noValidate onSubmit={props.onClick}>
            <div className="input-field col s12">
              Email
              <input
                onChange={props.onChange}
                value={props.email.value}
                error={props.errors.email}
                id="email"
                type="email"
                name="email"
              />
              {/* <label htmlFor='email'>Email</label> */}
            </div>
            <div className="input-field col s12">
              Password
              <input
                onChange={props.onChange}
                value={props.password.value}
                error={props.errors.password}
                id="password"
                type="password"
                name="password"
              />
              {/* <label htmlFor='password'>Password</label> */}
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <div className="col s12" style={{ paddingLeft: '11.250px' }}>
              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem',
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
