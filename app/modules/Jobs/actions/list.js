import axiosMainApi from 'components/axiosMainApi'

import {
    LIST_REQUEST,
    LIST_SUCCESS,
    LIST_FAILURE,
} from './actionTypes.js';

function requestJobs(filterType) {
    return {
        type: LIST_REQUEST,
        filterType,
    }
}

function receiveJobs(filterType, data) {
    return {
        type: LIST_SUCCESS,
        filterType,
        data,
    }
}

function jobsError(filterType, message) {
    return {
        type: LIST_FAILURE,
        filterType,
        message,
    }
}


export function fetchJobs(type) {
    return (dispatch) => {

        dispatch(requestJobs(type));

        return axiosMainApi({
            url: `jobs/type/${type}`,
            method: 'get',
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveJobs(type, response.data));
            } else {
                dispatch(jobsError(type, 'Failed to load jobs list'));
            }
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(jobsError(type, response && response.message ? response.message : 'Failed to load jobs list due to api failure'));
            } else {
                dispatch(jobsError(type, 'No response received'));
            }
        });
    }
}
