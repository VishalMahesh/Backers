import {
    COMPOSEMSG_REQUEST,
    COMPOSEMSG_SUCCESS,
    COMPOSEMSG_FAILURE,
    GET_MSG_REQUEST,
    GET_MSG_SUCCESS,
    GET_MSG_FAILURE,
    DELETE_CHAT_ROOM_REQUEST,
    DELETE_CHAT_ROOM_SUCCESS,
    DELETE_CHAT_ROOM_FAILURE
} from '../actions/action-type';

import { Record } from 'immutable';

const InitialState = Record({
    isFetching: false,
    isRefreshing: false,
    error: null,
});

const initialState = new InitialState();

const chatReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_MSG_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case GET_MSG_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case GET_MSG_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);
        case COMPOSEMSG_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case COMPOSEMSG_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case COMPOSEMSG_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);
        case DELETE_CHAT_ROOM_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case DELETE_CHAT_ROOM_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case DELETE_CHAT_ROOM_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);
        default:
            return state;
    }
};

export default chatReducer;
