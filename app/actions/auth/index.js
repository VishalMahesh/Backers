// import axios from 'axios';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILURE,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILURE,
  ONLINE,
  OFFLINE,
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILURE,
  API_REQUEST,
  API_SUCCESS,
  API_FAILURE
} from '../action-type';
import { setUserAuth, setObject, setUserToken, deleteToken, deleteAuth } from '../../middleware';
import axios from 'axios';
import { AppURLs, errorMsg } from '../../constants/constant';
import { Base } from '../../constants';
let USER_AUTH = Base.USER_AUTH

function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    entities: payload,
  };
}

function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    error: message,
  };
}

export function login(credentials, url, cb) {
  console.log(credentials);
  return (dispatch, getState) => {
    dispatch(loginRequest());
    return axios
      .post(url, credentials)
      .then((response) => {
        debugger
        if (response.data.status) {
          let data = response.data.success.data[0];
          let token = response.data.success.token;
          getState().entities.user.LoginData = data;
          dispatch(loginSuccess({ users: { LoginData: data } }));
          setUserToken(token);
          setUserAuth(data).then((res) => {
            cb(true);
          });
        }
        else {

          cb(false, response.data.error.message)
          return dispatch(loginFailure(response.data.error.message));
        }
      })
      .catch((error) => {
        console.log(error);
        cb(false, errorMsg)
        return dispatch(loginFailure(error));
      });
  };
}


export function removeUserdata(cb) {
  return (dispatch, getState) => {

    dispatch(loginRequest());
    return axios
      .get(AppURLs.Logout)
      .then((response) => {

        getState().entities.user.LoginData = [];
        deleteAuth()
        deleteToken().then(cb())
        return dispatch(loginSuccess());
      })
      .catch((error) => {
        console.log(error);
        return dispatch(loginFailure(error));
      });
  };
}

export function setUserdata(data) {
  return (dispatch, getState) => {
    getState().entities.user.LoginData = data;
  };
}

export function setUserLanguage(data) {
  return (dispatch, getState) => {
    getState().entities.user.language = data;
  };
}

function Online() {
  return {
    type: ONLINE,
  };
}

function Offline() {
  return {
    type: OFFLINE,
  };
}

export function setNetworkdata(data) {
  return (dispatch, getState) => {
    if (data) {
      dispatch(Online());
    } else {
      dispatch(Offline());
    }
  };
}

//SignUp

function RegisterRequest() {
  return {
    type: REGISTER_REQUEST,
  };
}

function RegisterSuccess(payload) {
  return {
    type: REGISTER_SUCCESS,
    entities: payload,
  };
}

function RegisterFailure(message) {
  return {
    type: REGISTER_FAILURE,
    error: message,
  };
}

export function registerUser(user, url, cb) {
  return (dispatch, getState) => {
    dispatch(RegisterRequest());
    return axios
      .post(url, user)
      .then((response) => {
        if (!response.data.error) {
          let data = response.data.success.data[0];
          let token = response.data.success.token;
          getState().entities.user.LoginData = data;
          dispatch(RegisterSuccess({ users: { RegisterData: data } }));
          setUserToken(token);
          setUserAuth(data);
          cb(true)
        } else {
          cb(false)
          dispatch(RegisterFailure(response.data.msg[0]));
        }
      })
      .catch((error) => {
        console.log(error);
        cb(false)
        return dispatch(RegisterFailure(error));
      });
  };
}

//Forgot Password

function forgotRequest() {
  return {
    type: FORGOT_REQUEST,
  };
}

function forgotSuccess(payload) {
  return {
    type: FORGOT_SUCCESS,
    entities: payload,
  };
}

function forgotFailure(message) {
  return {
    type: FORGOT_FAILURE,
    error: message,
  };
}

export function Forgot(email, cb) {
  return (dispatch, getState) => {
    dispatch(forgotRequest());
    return axios
      .post(AppURLs.forget, email)
      .then((response) => {

        let data = response.data.msg;
        if (!response.data.error) {

          dispatch(forgotSuccess()), cb(true, data);
        } else {
          cb(false, data);
        }
      })
      .catch((error) => {
        console.log(error)
        return dispatch(forgotFailure(error));
      });
  };
}

//Reset password

function resetRequest() {
  return {
    type: RESET_REQUEST,
  };
}

function resetSuccess(payload) {
  return {
    type: RESET_SUCCESS,
    entities: payload,
  };
}

function resetFailure(message) {
  return {
    type: RESET_FAILURE,
    error: message,
  };
}

export function Reset(credentials, cb) {
  return (dispatch, getState) => {
    dispatch(resetRequest());
    return axios
      .post(AppURLs.Reset, credentials)
      .then((response) => {
        let data = response.data.success;
        if (data) {
          dispatch(resetSuccess()), cb(true, data.msg);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        console.log(error)
        return dispatch(resetFailure(error));
      });
  };
}
function tokenRequest() {
  return {
    type: TOKEN_REQUEST,
  };
}

function tokenSuccess(payload) {
  return {
    type: TOKEN_SUCCESS,
    entities: payload,
  };
}

function tokenFailure(message) {
  return {
    type: TOKEN_FAILURE,
    error: message,
  };
}

export function DeviceToken(credentials, cb) {
  return (dispatch, getState) => {
    dispatch(tokenRequest());
    return axios
      .post(AppURLs.Devicetoken, credentials)
      .then((response) => {
        if (!response.data.error) {
          let data = response.data.user;

          getState().entities.user.LoginData = data;
          dispatch(tokenSuccess({ users: { LoginData: data } })),

            setUserAuth(data).then((res) => {
              cb(true);
            });
        }
        else {
          cb(false, response.data.msg)
          return dispatch(tokenFailure(response.data.msg));
        }
      })
      .catch((error) => {
        console.log(error);
        cb(false, errorMsg)
        return dispatch(loginFailure(error));
      });
  };
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

function apiFailure() {
  return {
    type: API_FAILURE,
  };
}

export function searchUsers(string, cb) {
  return (dispatch, getState) => {
    dispatch(apiRequest())
    return axios.get(`${AppURLs.searchUsers}${string}`).then(res => {
      debugger
      if (res.data.status) {
        let data = res.data.success.data
        getState().entities.user.searchedUsers = data
        cb(data)
      }
      else {
        cb([])
      }
      dispatch(apiSuccess())
    })
      .catch(err => {
        debugger
        console.log(err);
        cb([])
        dispatch(apiFailure())
      })
  };
}

export function FollowUser(data) {
  debugger
  return (dispatch, getState) => {
    dispatch(apiRequest())
    return axios.post(AppURLs.followUnfollow, data).then(res => {
      if (res.data.status) {
        debugger
      }
      dispatch(apiSuccess())
    })
      .catch(err => {
        console.log(err);
        dispatch(apiFailure())
      })
  };
}

export function updateProfile(param, isImage, cb) {
  let data = new FormData();
  if (isImage) {
    data.append('attachments', {
      uri: param.uri,
      name: `${JSON.stringify(Math.random())}.jpg`,
      type: `image/jpeg`,
    });
  }
  else {
    Object.keys(param).map((key) => {
      data.append(key, param[key]);
    });
  }
  console.log(data);
  debugger
  return (dispatch, getState) => {
    dispatch(apiRequest())
    return axios.put(AppURLs.updateProfile, data).then(response => {
      if (response.data.status) {
        let data = response.data.success.data[0];
        getState().entities.user.LoginData = data;
        setUserAuth(data).then((res) => {
          cb(true);
        });
      }
      else {
        cb(false)
      }
      dispatch(apiSuccess())
    })
      .catch(err => {
        console.log(err);
        cb(false)
        dispatch(apiFailure())
      });
  };
}

export function checkUserName(data, cb) {
  debugger
  return (dispatch, getState) => {
    dispatch(apiRequest())
    return axios.post(AppURLs.checkUserNameAvailability, data).then(response => {
      debugger
      if (response.data.status) {
        debugger
        cb(true)
      }
      else {
        cb(false)
      }
      dispatch(apiSuccess())
    })
      .catch(err => {
        debugger
        cb(false)
        dispatch(apiFailure())
      })
  };
}