import {
  ATTEMPT_REGISTER_SUCCESSFULLY,
  ATTEMPT_REGISTER_FAILED,
  ATTEMPT_LOGIN_SUCCESSFULLY,
  ATTEMPT_LOGIN_FAILED,
} from '../constant';

export default function(state = { loading: false, errors: null }, action) {
  switch (action.type) {
    // Register
    case ATTEMPT_REGISTER_SUCCESSFULLY:
      return { ...state, ...action.payload, ...{ loading: false } };
    case ATTEMPT_REGISTER_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };

    // Login
    case ATTEMPT_LOGIN_SUCCESSFULLY: {
      return { ...state, ...action.payload, ...{ loading: false } };
    }
    case ATTEMPT_LOGIN_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    default:
      return state;
  }
}
