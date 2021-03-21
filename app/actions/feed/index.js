import {
    CREATEPOST_REQUEST,
    CREATEPOST_SUCCESS,
    CREATEPOST_FAILURE,
    FETCHPOST_REQUEST,
    FETCHPOST_SUCCESS,
    FETCHPOST_FAILURE,
    LIKEPOST_REQUEST,
    LIKEPOST_SUCCESS,
    LIKEPOST_FAILURE,
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
} from "../action-type";
import React from 'react'
import { Platform } from 'react-native'
import axios from 'axios'
import { AppURLs, errorMsg } from '../../constants/constant';
let filecheck = Platform.OS == 'ios' ? "video" : "video/mp4"
function createPostRequest() {
    return {
        type: CREATEPOST_REQUEST,
    };
}

function createPostSuccess() {
    return {
        type: CREATEPOST_SUCCESS,
    };
}

function createPostfailure() {
    return {
        type: CREATEPOST_SUCCESS,
    };
}

export function addFeed(feed, cb) {
    let data = new FormData();
    let param = feed.params;
    let attachment = feed.source
    if (attachment.length > 0) {
        attachment.forEach(item => {
            if (item.type !== filecheck) {
                data.append('attachments', {
                    uri: item.uri,
                    name: `${JSON.stringify(Math.random())}.jpg`,
                    type: `image/jpeg`,
                });
            }
            else {
                data.append('attachments', {
                    uri: item.uri,
                    name: `${JSON.stringify(Math.random())}.mp4`,
                    type: `video/mp4`,
                });
            }
        });
    }
    Object.keys(param).map((key) => {
        data.append(key, param[key]);
    });
    return (dispatch, getState) => {
        dispatch(createPostRequest())
        return axios.post(AppURLs.postcreate, data).then((res) => {
            if (res.data.status) {
                // let arr = [...getState().entities.feed.homeFeeds]
                // let newPost = res.data.success.data;
                // let newArr = newPost.concat(arr)
                // getState().entities.feed.homeFeeds = [...newArr]
                cb(true, res.data.success.message)
            }
            dispatch(createPostSuccess())
        })
            .catch(err => {

                cb(false, errorMsg)
                dispatch(createPostfailure(err))
            })
    };
}


function fetchPostRequest() {
    return {
        type: FETCHPOST_REQUEST,
    };
}

function fetchPostSuccess() {
    return {
        type: FETCHPOST_SUCCESS,
    };
}

function fetchPostfailure() {
    return {
        type: FETCHPOST_FAILURE,
    };
}


export function fetchFeeds(cb) {
    return (dispatch, getState) => {
        dispatch(fetchPostRequest())
        return axios.get(AppURLs.fetchPosts).then((res) => {
            if (res.data.status) {
                getState().entities.feed.homeFeeds = [...res.data.success.data]
            }
            cb()
            dispatch(fetchPostSuccess())
        })
            .catch(err => {
                cb()
                console.log(err);
                dispatch(fetchPostfailure(err))
            })
    };
}


function likePostRequest() {
    return {
        type: LIKEPOST_REQUEST,
    };
}

function likePostSuccess() {
    return {
        type: LIKEPOST_SUCCESS,
    };
}

function likePostfailure() {
    return {
        type: LIKEPOST_FAILURE,
    };
}

export function likePosts(id, ind, isLiked, notHome) {
    let data = {
        postId: id
    }
    let url = isLiked ? AppURLs.unlikePosts : AppURLs.likePosts
    return (dispatch, getState) => {
        dispatch(likePostRequest())
        return axios.post(url, data).then(res => {
            if (res.data.status) {
                if (!notHome) {
                    let arr = [...getState().entities.feed.homeFeeds]
                    arr[ind].alreadyLiked = isLiked ? false : true;
                    getState().entities.feed.homeFeeds = [...arr]
                }
            }
            dispatch(likePostSuccess())
        })
            .catch((err) => {
                console.log(err);

                dispatch(likePostfailure())
            })
    }
}


function deletePostRequest() {
    return {
        type: DELETE_POST_REQUEST,
    };
}

function deletePostSuccess() {
    return {
        type: DELETE_POST_SUCCESS,
    };
}

function deletePostfailure() {
    return {
        type: DELETE_POST_FAILURE,
    };
}

export function deletePosts(id, index, cb) {
    return (dispatch, getState) => {
        dispatch(deletePostRequest())
        return axios.delete(`${AppURLs.deletePost}${id}`).then(res => {
            if (res.data.status) {
                let arr = [...getState().entities.feed.homeFeeds]
                arr.splice(index, 1);
                getState().entities.feed.homeFeeds = [...arr]
                cb(true)
            }
            else {
                cb(false)
            }
            dispatch(deletePostSuccess())
        })
            .catch((err) => {
                console.log(err);
                cb(false)
                dispatch(deletePostfailure())
            })
    }
}



function fetchCommentsRequest() {
    return {
        type: FETCH_COMMENTS_REQUEST,
    };
}

function fetchCommentsSuccess() {
    return {
        type: FETCH_COMMENTS_SUCCESS,
    };
}

function fetchCommentsfailure() {
    return {
        type: FETCH_COMMENTS_FAILURE,
    };
}

export function fetchComments(id, cb) {
    return (dispatch, getState) => {
        dispatch(fetchCommentsRequest())
        getState().entities.feed.postComments = []
        return axios.get(`${AppURLs.fetchComments}?postId=${id}`).then(res => {

            if (res.data.status) {
                getState().entities.feed.postComments = res.data.success.data
                cb(res.data.success.data)
            }
            else {
                cb([])
            }
            dispatch(fetchCommentsSuccess())
        })
            .catch((err) => {
                console.log(err);

                cb([])
                dispatch(fetchCommentsfailure())
            })
    }
}



function createCommentsRequest() {
    return {
        type: CREATE_COMMENTS_REQUEST,
    };
}

function createCommentsSuccess() {
    return {
        type: CREATE_COMMENTS_SUCCESS,
    };
}

function createCommentsfailure() {
    return {
        type: CREATE_COMMENTS_FAILURE,
    };
}

export function createComments(id, comment, cb) {
    let data = {
        postId: id,
        comment: comment
    }
    return (dispatch, getState) => {
        dispatch(createCommentsRequest())
        return axios.post(AppURLs.createComments, data).then(res => {
            if (res.data.status) {
                dispatch(fetchComments(id, data => {
                    let arr = [...getState().entities.feed.homeFeeds]
                    let objInd = arr.findIndex((e) => e._id == id);
                    if (objInd > -1) {
                        arr[objInd].commentCount = data.length
                        getState().entities.feed.homeFeeds = [...arr]
                    }
                    cb(data)
                }))
            }
            else {
                cb([])
            }
            dispatch(createCommentsSuccess())
        })
            .catch((err) => {
                cb([])
                console.log(err);
                dispatch(createCommentsfailure())
            })
    }
}




function apiRequest() {
    return {
        type: API_REQUEST,
    };
}

function apiSuccess() {
    return {
        type: API_SUCCESS,
    };
}

function apifailure() {
    return {
        type: API_FAILURE,
    };
}

export function likeComment(id) {
    let data = {
        commentId: id
    }
    return (dispatch, getState) => {
        axios.post(AppURLs.likeComment, data).then(res => {
            //debugger
        })
            .catch(err => {
                //debugger
                console.log(err);
            })
    }
}

export function unlikeComment(id) {
    let data = {
        commentId: id
    }
    return (dispatch, getState) => {
        axios.post(AppURLs.unlikeComment, data).then(res => {
            //debugger
        })
            .catch(err => {
                //debugger
                console.log(err);
            })
    }
}