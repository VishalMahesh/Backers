import {
  CREATEPOST_REQUEST,
  CREATEPOST_SUCCESS,
  CREATEPOST_FAILURE,
} from '../actions/action-type';

import { Record } from 'immutable';

const InitialState = Record({
  isFetching: false,
  error: null,
});

const initialState = new InitialState();

const adReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATEPOST_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case CREATEPOST_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case CREATEPOST_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], action.error);
    default:
      return state;
  }
};

export default adReducer;
