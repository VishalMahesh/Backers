
import axios from 'axios';
import { AppURLs } from '../../constants/constant';

// Compose Message

import {
    COMPOSEMSG_REQUEST,
    COMPOSEMSG_SUCCESS,
    COMPOSEMSG_FAILURE,
    GET_MSG_REQUEST,
    GET_MSG_SUCCESS,
    GET_MSG_FAILURE,
    GET_USER_MSG_REQUEST,
    GET_USER_MSG_FAILURE,
    GET_USER_MSG_SUCCESS,
    DELETE_CHAT_ROOM_REQUEST,
    DELETE_CHAT_ROOM_SUCCESS,
    DELETE_CHAT_ROOM_FAILURE
} from "../action-type";

function composemsgRequest() {
    return {
        type: COMPOSEMSG_REQUEST,
    };
}

function composemsgSuccess() {
    return {
        type: COMPOSEMSG_SUCCESS,
    };
}

function composemsgFailure() {
    return {
        type: COMPOSEMSG_FAILURE,
    };
}

export function composemsg(obj, cb) {
    return (dispatch, getState) => {
        dispatch(composemsgRequest());
        return axios
            .post(AppURLs.composemsg, obj)
            .then((response) => {
                if (response.data.success) {
                    cb(true);
                    dispatch(composemsgSuccess());
                } else {
                    dispatch(composemsgFailure());
                    cb(false);
                }
            })
            .catch((error) => {
                console.log(error)
                cb(false);
                // 
                return dispatch(composemsgFailure(error));
            });
    };
}

export function addmsg(obj) {
    return axios
        .post(AppURLs.composemsg, obj)
        .then((response) => {

        })
        .catch((error) => {
            console.log(error)

        });
}


function getmsgRequest() {
    return {
        type: GET_MSG_REQUEST,
    };
}

function getmsgSuccess() {
    return {
        type: GET_MSG_SUCCESS,
    };
}

function getmsgFailure() {
    return {
        type: GET_MSG_FAILURE,
    };
}

export function getAllmsg(obj) {
    return (dispatch, getState) => {
        dispatch(getmsgRequest());
        return axios
            .post(AppURLs.fetchMsg, obj)
            .then((response) => {
                if (response.status == 200) {
                    getState().entities.messages.messages = response.data.data;
                    let data = response.data.data;
                    let count = 0;
                    data.forEach(element => {
                        if (element.unread_count) {
                            count += element.unread_count
                        }
                    });
                    getState().entities.messages.unreadcount = count;
                    dispatch(getmsgSuccess());
                } else {
                    dispatch(getmsgFailure());
                }
            })
            .catch((error) => {
                console.log(error)

                return dispatch(getmsgFailure(error));
            });
    };
}


function getUserMsgRequest() {
    return {
        type: GET_USER_MSG_REQUEST,
    };
}

function getUserMsgSuccess() {
    return {
        type: GET_USER_MSG_SUCCESS,
    };
}

function getUserMsgFailure() {
    return {
        type: GET_USER_MSG_FAILURE,
    };
}

export function getUsermsg(obj, cb) {
    return (dispatch, getState) => {
        dispatch(getUserMsgRequest());
        return axios
            .post(AppURLs.fetchUserMsg, obj)
            .then((response) => {
                // 
                if (response.status == 200) {
                    cb(response.data.data)
                    getState().entities.messages.usermessages = response.data.data;
                    dispatch(getUserMsgSuccess());
                } else {
                    dispatch(getUserMsgFailure());
                    cb([])
                }
            })
            .catch((error) => {
                console.log(error)
                cb([])
                return dispatch(getUserMsgFailure(error));
            });
    };
}

function deleteChatRequest() {
    return {
        type: DELETE_CHAT_ROOM_REQUEST,
    };
}

function deleteChatSuccess() {
    return {
        type: DELETE_CHAT_ROOM_SUCCESS,
    };
}

function deleteChatFailure() {
    return {
        type: DELETE_CHAT_ROOM_FAILURE,
    };
}

export function deleteChatRoom(obj, cb) {
    return (dispatch, getState) => {
        dispatch(deleteChatRequest());
        return axios
            .post(AppURLs.deleteUserMsg, obj)
            .then((response) => {
                if (response.data.success) {
                    const Userid = getState().entities.user.LoginData.id
                    let user = { user_id: Userid }
                    cb(response.data.success)
                    dispatch(deleteChatSuccess());
                    dispatch(getAllmsg(user));
                }
                else {
                    cb(response.data.error)
                    dispatch(deleteChatFailure(error));
                }
            })
            .catch((error) => {
                console.log(error);
                return dispatch(deleteChatFailure(error));
            });
    };
}