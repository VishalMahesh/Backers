import Axios from "axios";
import { AppURLs } from "../../constants/constant";
import { API_FAILURE, API_REQUEST, API_SUCCESS } from "../action-type";

export function addReelVideo(source, cb) {
    return (dispatch, getState) => {
        const prev = getState().entities.reel.reelVideos;
        let newItem = [{
            id: Math.random(),
            source: { uri: source }
        }]
        getState().entities.reel.reelVideos = newItem.concat(prev);
        cb()
    };
}

export function setActiveTab(tab) {
    return (dispatch, getState) => {
        getState().entities.reel.prevactiveTab = tab
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

function apifailure() {
    return {
        type: API_FAILURE,
    };
}

export function getReels() {
    return (dispatch, getState) => {
        dispatch(apiRequest())
        return Axios.get(AppURLs.fetchReels).then(res => {
            if (res.data.status) {
                getState().entities.reel.reelVideos = [...res.data.success.data]
            }
            dispatch(apiSuccess())
        })
            .catch((err) => {
                console.log(err);
                dispatch(apifailure())
            })
    }
}