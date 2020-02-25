import axios from 'axios';
import { loginSuccessfully, loginFailed } from '../store/actions/auth.action';
import { HOST, LOGIN_URI, USER_TOKEN } from '../constants';
import { setTokenToLocalStorage } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const login = userData => dispatch => {
  axios
    .post(`${HOST}${LOGIN_URI}`, userData)
    .then(res => {
      // Set userToken to Local Storage
      setTokenToLocalStorage(USER_TOKEN, res.data.token).then(() => {
        dispatch(loginSuccessfully(res.data));
      });
    })
    .catch(err => {
      console.log(`error: ${err}`);
      dispatch(loginFailed(err));
    });
};
