import * as types from './actions';

const initialState = {
  name: '',
  password: '',
  message: '',
  error: false,
}

export default function loginApp(state=initialState, action) {
  switch (action.type) {
    case types.LOG_IN:
      return Object.assign({}, state, {
        name: action.name,
        password: action.password,
      });
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        message: action.message,
      });
    case types.LOGIN_ERROR:
      return Object.assign({}, state, {
        error: true,
        message: action.message,
      });
    case types.REG:
      return Object.assign({}, state, {
        name: action.name,
        password: action.password,
      });
    case types.REG_SUCCESS:
      return Object.assign({}, state, {
        message: action.message,
      });
    case types.REG_ERROR:
      return Object.assign({}, state, {
        error: true,
        message: action.message,
      });
    default:
      return state;
  }
}
