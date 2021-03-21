import Axios from "axios";
import { AppURLs } from "../../constants/constant";
import { API_REQUEST, API_SUCCESS, API_FAILURE } from "../action-type";
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


export function updateSubscriptions(id, data, obj, cb) {
    let newdata = obj;
    if (data) {
        data.forEach(item => {
            newdata[item.key] = item.active
        })
    }
    return (dispatch, getState) => {
        dispatch(apiRequest())
        return Axios.put(`${AppURLs.updateSubscription + id}`, newdata).then(res => {
            //debugger
            if (res.data.status) {
                cb(true, res.data.success.message)
            }
            else {
                cb(false, res.data.error.message)
            }
            dispatch(apiSuccess())
        })
            .catch(err => {
                cb(false, "Something went wrong")
                dispatch(apiFailure())
            })
    }
}

export function fetchSubscriptionsById(data, cb) {
    return (dispatch, getState) => {
        dispatch(apiRequest())
        return Axios.get(AppURLs.fetchSubscriptionById + data).then(res => {
            if (res.data.status) {
                getState().entities.profile.userSubscriptions = res.data.success.data
                cb(res.data.success.data)
            }
            else {
                cb([])
            }
            dispatch(apiSuccess())
        })
            .catch(err => {
                cb([])
                console.log(err);
                dispatch(apiFailure())
            })
    }
}



export function fetchUserSubscriptions(data) {
    return (dispatch, getState) => {
        dispatch(apiRequest())
        return Axios.get(AppURLs.fetchUserSubscription + data).then(res => {
            if (res.data.status) {
                let data = res.data.success.data
                let arr = [...data]
                let newArr = []
                arr.forEach(item => {
                    let obj = {}
                    if (item.type !== "free") {
                        obj.name = item.displayName ? item.displayName : item.type.toUpperCase()
                        obj.id = item._id
                        obj.price = item.price
                        newArr.push(obj)
                    }
                })
                getState().entities.profile.otherSubscriptions = newArr
            }
            dispatch(apiSuccess())
        })
            .catch(err => {
                console.log(err);
                dispatch(apiFailure())
            })
    }
}



export function fetchMySubscriptions() {
    return (dispatch, getState) => {
        dispatch(apiRequest())
        return Axios.get(AppURLs.fetchMySubscriptions).then(res => {
            if (res.data.status) {
                getState().entities.profile.userSubscriptions = res.data.success.data
            }
            dispatch(apiSuccess())
        })
            .catch(err => {
                console.log(err);
                dispatch(apiFailure())
            })
    }
}

export function subscribeToPost(data, cb) {
    return (dispatch, getState) => {
        dispatch(apiRequest())
        return Axios.post(AppURLs.bookSubscription, data).then(res => {
            if (res.data.status) {
                cb(true)
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
            })
    }
}


export function fetchMyBookedSubscriptions() {
    return (dispatch, getState) => {
        dispatch(apiRequest())
        return Axios.get(AppURLs.fetchbookedSubscription).then(res => {
            if (res.data.status) {
                getState().entities.profile.bookedSubscriptions = res.data.success.data
            }
            dispatch(apiSuccess())
        })
            .catch(err => {
                console.log(err);
                dispatch(apiFailure())
            })
    }
}

export function sendAppreciations(data, cb) {
    return (dispatch, getState) => {
        dispatch(apiRequest())
        return Axios.post(AppURLs.sendAppreciation, data).then(res => {
            if (res.data.status) {
                cb(true)
            }
            else {
                cb(false)
            }
            dispatch(apiSuccess())
        })
            .catch(err => {
                cb(false)
                console.log(err);
                dispatch(apiFailure())
            })
    }
}