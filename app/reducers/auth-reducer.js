import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  ONLINE,
  OFFLINE,
} from '../actions/action-type';

import { Record } from 'immutable';

const InitialState = Record({
  isFetching: false,
  isAuthorized: false,
  error: null,
  Offline: null,
});

const initialState = new InitialState();

const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case LOGIN_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case LOGIN_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], action.error);
    case LOGOUT_USER:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case REGISTER_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case REGISTER_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case REGISTER_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], action.error);
    case ONLINE:
      return state.setIn(['Offline'], false).setIn(['error'], null);
    case OFFLINE:
      return state.setIn(['Offline'], true).setIn(['error'], null);
    default:
      return state;
  }
};

export default authReducer;
