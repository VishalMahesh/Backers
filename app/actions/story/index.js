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

export function fetchStories(cb) {
    return (dispatch, getState) => {
        dispatch(apiRequest())
        return Axios.get(AppURLs.fetchStory).then(res => {
            if (res.data.status) {
                getState().entities.story.stories = [...res.data.success.data]
            }
            cb()
            dispatch(apiSuccess())
        })
            .catch((err) => {
                console.log(err);
                cb()
                dispatch(apiFailure())
            })
    }
}