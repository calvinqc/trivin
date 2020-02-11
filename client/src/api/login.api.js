import axios from 'axios';

import {
  attemptLoginSuccessfully,
  attemptLoginFailed,
} from '../actions/login.action';

import { HOST, LOGIN_URI, USER_TOKEN } from '../constant';

import { setTokenToLocalStorage } from '../utils';

// Register
// eslint-disable-next-line import/prefer-default-export
export const attemptLogin = userData => dispatch => {
  axios
    .post(`${HOST}${LOGIN_URI}`, userData)
    .then(res => {
      // Set userToken to Local Storage
      setTokenToLocalStorage(USER_TOKEN, res.data.token).then(() => {
        dispatch(attemptLoginSuccessfully(res.data));
      });
    })
    .catch(err => {
      console.log('error');
      console.log(err);
      dispatch(attemptLoginFailed(err));
    });
};
