import {
  CREATEPOST_REQUEST,
  CREATEPOST_SUCCESS,
  CREATEPOST_FAILURE,
  FETCHPOST_REQUEST,
  FETCHPOST_SUCCESS,
  FETCHPOST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  CREATE_COMMENTS_REQUEST,
  CREATE_COMMENTS_SUCCESS,
  CREATE_COMMENTS_FAILURE,
  API_REQUEST,
  API_SUCCESS,
  API_FAILURE
} from '../actions/action-type';

import { Record } from 'immutable';

const InitialState = Record({
  isFetching: false,
  isAuthorized: true,
  isRefreshing: false,
  error: null,
  Network: true,
});

const initialState = new InitialState();

const feedReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATEPOST_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case CREATEPOST_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case CREATEPOST_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case DELETE_POST_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case DELETE_POST_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case DELETE_POST_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case FETCHPOST_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case FETCHPOST_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case FETCHPOST_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case FETCH_COMMENTS_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case FETCH_COMMENTS_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case FETCH_COMMENTS_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case CREATE_COMMENTS_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case CREATE_COMMENTS_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case CREATE_COMMENTS_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case API_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case API_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case API_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], null);

    default:
      return state;
  }
};

export default feedReducer;
