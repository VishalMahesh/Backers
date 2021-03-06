import {
    PROFILE_EDIT_REQUEST,
    PROFILE_EDIT_SUCCESS,
    PROFILE_EDIT_FAILURE,
    GETCODE_REQUEST,
    GETCODE_SUCCESS,
    GETCODE_FAILURE,
    GETCOUNTRY_REQUEST,
    GETCOUNTRY_SUCCESS,
    GETCOUNTRY_FAILURE,
    GETTERRITORY_REQUEST,
    GETTERRITORY_SUCCESS,
    GETTERRITORY_FAILURE,
    ABOUT_COMPANY_REQUEST,
    ABOUT_COMPANY_SUCCESS,
    ABOUT_COMPANY_FAILURE,
    EDIT_COMPANY_REQUEST,
    EDIT_COMPANY_SUCCESS,
    EDIT_COMPANY_FAILURE,
    TERMS_REQUEST,
    TERMS_SUCCESS,
    TERMS_FAILURE,
    FAQ_REQUEST,
    FAQ_SUCCESS,
    FAQ_FAILURE,
    PRIVACY_REQUEST,
    PRIVACY_SUCCESS,
    PRIVACY_FAILURE,
    ABOUT_USER_REQUEST,
ABOUT_USER_SUCCESS,
ABOUT_USER_FAILURE
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
        case EDIT_COMPANY_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case EDIT_COMPANY_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case EDIT_COMPANY_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);
        case ABOUT_COMPANY_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case ABOUT_COMPANY_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case ABOUT_COMPANY_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);
        case GETCODE_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case GETCODE_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case GETCODE_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);
        case GETCOUNTRY_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case GETCOUNTRY_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case GETCOUNTRY_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);
        case GETTERRITORY_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case GETTERRITORY_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case GETTERRITORY_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);
        case TERMS_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case TERMS_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case TERMS_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);
        case FAQ_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case FAQ_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case FAQ_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);
        case PRIVACY_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case PRIVACY_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case PRIVACY_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);
        case ABOUT_USER_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case ABOUT_USER_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case ABOUT_USER_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);

        default:
            return state;
    }

}

export default profileReducer;