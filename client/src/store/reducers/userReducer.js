import {
  LOGIN_SUCCESSFULLY,
  LOGIN_FAILED,
  LOGOUT,
  SET_USER_TOKEN,
} from '../../constants';

export default function(state = { loading: false, errors: null }, action) {
  switch (action.type) {
    case LOGIN_SUCCESSFULLY:
      return { ...state, ...action.payload, ...{ loading: false } };
    case LOGIN_FAILED:
      return { ...state, ...{ loading: false }, ...{ errors: action.payload } };
    case SET_USER_TOKEN:
      return action.payload;
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
