import {
    PROFILE_EDIT_REQUEST,
    PROFILE_EDIT_SUCCESS,
    PROFILE_EDIT_FAILURE,
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
        case PROFILE_EDIT_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case PROFILE_EDIT_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case PROFILE_EDIT_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);
        default:
            return state;
    }

}

export default profileReducer;