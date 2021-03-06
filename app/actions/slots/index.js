import axios from 'axios';
import { localeData } from 'moment';
import { API_ROOT, AppURLs } from '../../constants/constant';
import { showErrorAlert } from '../../utils/info';
import {
    RECUR_SLOTS_UPDATE_REQUEST,
    RECUR_SLOTS_UPDATE_SUCCESS,
    RECUR_SLOTS_UPDATE_FAILURE,
    GET_SCHEDULED_SLOTS_R,
    GET_SCHEDULED_SLOTS_S,
    GET_SCHEDULED_SLOTS_F
} from '../action-type'
import AppUtils, { formatAMPM } from '../../utils'
import { initialSlots } from '../../constants/dummy';
import _ from 'lodash'
import backend from '../../config/backend';

function remove_duplicates(arr) {
    keys = ["startTime", "endTime"]
    filtered = arr.filter(
        (s => o =>
            (k => !s.has(k) && s.add(k))
                (keys.map(k => o[k]).join('|'))
        )
            (new Set)
    );
    return filtered;
}

function getSlotStatus(arr) {
    let tt = false
    arr.forEach(item => {
        if (item.slotType == "once") {
            tt = true;
        }
    });
    return tt
}


function recurupdateRequest() {
    return {
        type: RECUR_SLOTS_UPDATE_REQUEST,
    };
}

function recurupdateSuccess(payload) {
    return {
        type: RECUR_SLOTS_UPDATE_SUCCESS,
        entities: payload,
    };
}

function recurupdateFailure(message) {
    return {
        type: RECUR_SLOTS_UPDATE_FAILURE,
        error: message,
    };
}

export function recurUpdateSlots(dateObj, isdate, cb) {
    var data = []
    var delAll = false;
    if (dateObj.length == 0) {
        data.push({
            "slotType": isdate ? "once" : "recurring",
            "isDelete": true
        })
        delAll = true;
    }
    else {
        data = [...dateObj]
    }
    return (dispatch, getState) => {
        dispatch(recurupdateRequest());
        return axios
            .post(AppURLs.createslot, data)
            .then((response) => {
                if (response.data.status && !response.data.error) {
                    cb(true, response.data.success.message)
                }
                else {
                    cb(false)
                }
                return dispatch(recurupdateSuccess());
            })
            .catch((error) => {
                console.log(error)
                cb(false)
                return dispatch(recurupdateFailure(error));
            });
    };
}

function getInitialisedValues() {
    let arr = [...initialSlots]
    let newArr = []
    arr.forEach(item => {
        let obj = item
        obj["slots"] = [
            {
                id: 0,
                start: 0,
                end: 0,
                startTime: "12:00 PM",
                endTime: "12:30 PM",
                default: true
            }
        ]
        obj['selected'] = false
        newArr.push(obj)
    })
    return newArr
}

export function setrecurringSlots(data, cb) {
    return (dispatch, getState) => {
        dispatch(recurupdateRequest());
        let arr = [...data];
        const arr2 = getInitialisedValues();
        arr.forEach(item => {
            if (item.slotType !== "once") {
                var objInd = arr2.findIndex((e) => e.title == item.day);
                var newSlots = {}
                newSlots = {
                    id: Math.random(),
                    start: AppUtils.timeIndex(item.startTime),
                    end: AppUtils.timeIndex(item.endTime),
                    startTime: formatAMPM(new Date(item.startTime)),
                    endTime: formatAMPM(new Date(item.endTime))
                }
                arr2[objInd].selected = true
                if (arr2[objInd].slots[0]) {
                    if (arr2[objInd].slots[0].default) {
                        arr2[objInd].slots.length = 0
                        arr2[objInd].slots.push(newSlots)
                    }
                    else {
                        arr2[objInd].slots.push(newSlots)
                    }
                }
                else {
                    arr2[objInd].slots.push(newSlots)
                }
            }

        })

        // let uniqueArr = []
        // arr2.forEach(item => {
        //     let obj = item;
        //     obj.slots = remove_duplicates(item.slots)
        //     uniqueArr.push(obj)
        // })
        cb([...arr2])
        return dispatch(recurupdateSuccess());
    }
}

function getScheduleRequest() {
    return {
        type: GET_SCHEDULED_SLOTS_R,
    };
}

function getScheduleSuccess(payload) {
    return {
        type: GET_SCHEDULED_SLOTS_S,
        entities: payload,
    };
}

function getScheduleFailure(message) {
    return {
        type: GET_SCHEDULED_SLOTS_F,
        error: message,
    };
}


export function getSchedule(data, cb) {
    return (dispatch, getState) => {
        dispatch(getScheduleRequest());
        return axios
            .get(`${AppURLs.slotfetch}?userId=${data.userId}&startDate=${data.startDate}&endDate=${data.endDate}`)
            .then((response) => {
                if (response.data.status) {
                    getState().entities.slot.userSlots = response.data.success.data
                    cb(true, response.data.success.data)
                }
                return dispatch(getScheduleSuccess());
            })
            .catch((error) => {
                console.log(error)
                cb(false, [])
                return dispatch(getScheduleFailure(error));
            });
    };
}

export function getUserRecurringSlots(cb) {
    return (dispatch, getState) => {
        dispatch(getScheduleRequest());
        getState().entities.slot.recurSlots = getInitialisedValues()
        return axios
            .get(`${AppURLs.slotFetchRecur}`)
            .then((response) => {
                if (response.data.status) {
                    let data = response.data.success.data;
                    let prevarr = [...getInitialisedValues()]
                    if (data.length > 0) {
                        data.forEach((item, index) => {
                            let ObjInd = prevarr.findIndex((e) => e.title == item.day);
                            if (ObjInd > -1) {
                                prevarr[ObjInd].selected = true
                                prevarr[ObjInd].slots[0].start = AppUtils.timeIndex(item.startTime);
                                prevarr[ObjInd].slots[0].end = AppUtils.timeIndex(item.endTime);
                                prevarr[ObjInd].slots[0].startTime = formatAMPM(new Date(item.startTime));
                                prevarr[ObjInd].slots[0].endTime = formatAMPM(new Date(item.endTime));
                            }
                        })
                    }
                    getState().entities.slot.recurSlots = [...prevarr]
                    cb(true, [...prevarr])
                }
                return dispatch(getScheduleSuccess());
            })
            .catch((error) => {
                console.log(error)
                cb(false, [])
                return dispatch(getScheduleFailure(error));
            });
    };
}


function getBookingRequest() {
    return {
        type: GET_SCHEDULED_SLOTS_R,
    };
}

function getBookingSuccess(payload) {
    return {
        type: GET_SCHEDULED_SLOTS_S,
        entities: payload,
    };
}

function getBookingFailure(message) {
    return {
        type: GET_SCHEDULED_SLOTS_F,
        error: message,
    };
}


export function addBooking(data, cb) {
    return (dispatch, getState) => {
        dispatch(getBookingRequest());
        return axios
            .post(AppURLs.bookslot, data)
            .then((response) => {
                if (response.data.status) {
                    dispatch(getBookingRequest());
                    cb(true, response.data.success.data)
                }
                return dispatch(getBookingSuccess());
            })
            .catch((error) => {
                console.log(error)
                cb(false, [])
                return dispatch(getBookingFailure(error));
            });
    };
}