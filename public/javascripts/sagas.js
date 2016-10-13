import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { fetchApi } from './utils';
import * as types from './actions';
import { browserHistory } from 'react-router';

function fetchLogin(action) {
  return fetchApi('/api/login', 'POST', action);
}

function fetchReg(action) {
  return fetchApi('/api/reg', 'POST', action);
}

export function* initAuth(getState, action) {
  const { response, error } = yield call(fetchLogin, action);
  if (response.status === 200) {
    yield put({
      type: types.LOGIN_SUCCESS,
      message: response.message,
    });
    localStorage.name = response.data.username;
    browserHistory.push('/home');
  } else {
    yield put({
      type: types.LOGIN_ERROR,
      message: response.message,
    });
  }
}

export function* initReg(getState, action) {
  const { response, error } = yield call(fetchReg, action);
  if (response.status === 200) {
    yield put({
      type: types.REG_SUCCESS,
      message: response.message,
    });
    localStorage.name = action.name;
    browserHistory.push('/');
  } else {
    yield put({
      type: types.REG_ERROR,
      message: response.message,
    });
  }
}

export default function* root(getState) {
  yield [
    takeLatest(types.LOG_IN, initAuth, getState),
    takeLatest(types.REG, initReg, getState),
  ]
}
