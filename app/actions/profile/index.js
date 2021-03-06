import {
  API_REQUEST,
  API_SUCCESS,
  API_FAILURE,
} from '../action-type';
import { AppURLs } from '../../constants/constant';
import axios from 'axios';

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

function apiFailure() {
  return {
    type: API_FAILURE,
  };
}

export function profilePosts(id, cb) {
  return (dispatch, getState) => {
    dispatch(apiRequest());
    return axios
      .get(`${AppURLs.fetchUserPosts}${id}`)
      .then((response) => {
        debugger
        if (response.data.status) {
          getState().entities.profile.userPosts = response.data.success.data
          cb(true)
          dispatch(apiSuccess())
        } else {
          cb(false, response.data.error.message);
        }
      })
      .catch((error) => {
        console.log(error);
        cb(false)
        return dispatch(apiFailure(error));
      });
  };
}

export function profileReels(id, cb) {

  return (dispatch, getState) => {
    dispatch(apiRequest());
    return axios
      .get(`${AppURLs.fetchUserReels}${id}`)
      .then((response) => {

        if (response.data.status) {
          getState().entities.profile.userReels = response.data.success.data
          cb(true)
          dispatch(apiSuccess())
        } else {
          cb(false, response.data.success.message);
        }
      })
      .catch((error) => {
        console.log(error)
        cb(false)
        return dispatch(apiFailure(error));
      });
  };
}



export function getSentAppreciation(page, cb) {
  return (dispatch, getState) => {
    dispatch(apiRequest());
    return axios
      .get(`${AppURLs.getSentAppreciation}?page=${page}&resultsPerPage=10`)
      .then((response) => {
        if (response.data.status) {
          let data = response.data.success.data
          if (page == 1) {
            getState().entities.profile.sentAppreciation = data
          }
          else {
            let arr = getState().entities.profile.sentAppreciation
            getState().entities.profile.sentAppreciation = arr.concat(data)
          }
        }
        cb()
        dispatch(apiSuccess())
      })
      .catch((error) => {
        console.log(error)
        cb(false)
        return dispatch(apiFailure(error));
      });
  };
}



export function getReceivedAppreciation(page,) {
  return (dispatch, getState) => {
    dispatch(apiRequest());
    return axios
      .get(`${AppURLs.getReceivedAppreciation}?page=${page}&resultsPerPage=10`)
      .then((response) => {
        if (response.data.status) {
          let data = response.data.success.data
          if (page == 1) {
            getState().entities.profile.receivedAppreciation = data
          }
          else {
            let arr = getState().entities.profile.receivedAppreciation
            getState().entities.profile.receivedAppreciation = arr.concat(data)
          }
        }
        dispatch(apiSuccess())
        cb()
      })
      .catch((error) => {
        console.log(error)
        cb(false)
        return dispatch(apiFailure(error));
      });
  };
}