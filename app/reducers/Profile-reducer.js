import {
    API_REQUEST,
    API_SUCCESS,
    API_FAILURE
} from '../actions/action-type';

import { Record } from 'immutable';

const InitialState = Record({
    isFetching: true,
    isAuthorized: false,
    error: null,
});

const initialState = new InitialState;

const profileReducer = (state = initialState, action = {}) => {

    switch (action.type) {
        case API_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case API_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case API_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);
        default:
            return state;
    }

}

export default profileReducer;