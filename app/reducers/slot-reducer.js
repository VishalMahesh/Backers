import {
    RECUR_SLOTS_UPDATE_REQUEST,
    RECUR_SLOTS_UPDATE_SUCCESS,
    RECUR_SLOTS_UPDATE_FAILURE,
    GET_SCHEDULED_SLOTS_R,
    GET_SCHEDULED_SLOTS_S,
    GET_SCHEDULED_SLOTS_F,
} from '../actions/action-type';

import { Record } from 'immutable';

const InitialState = Record({
    isFetching: false,
    isRefreshing: false,
    error: null,
});

const initialState = new InitialState();

const slotReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case RECUR_SLOTS_UPDATE_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case RECUR_SLOTS_UPDATE_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case RECUR_SLOTS_UPDATE_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case GET_SCHEDULED_SLOTS_R:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case GET_SCHEDULED_SLOTS_S:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case GET_SCHEDULED_SLOTS_F:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        default:
            return state;
    }
};

export default slotReducer;
