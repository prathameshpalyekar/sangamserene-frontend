import axiosMainApi from 'components/axiosMainApi'

import {
    FETCH_JOB_REQUEST,
    FETCH_JOB_SUCCESS,
    FETCH_JOB_FAILURE,
} from './actionTypes.js';

function requestJob(id) {
    return {
        type: FETCH_JOB_REQUEST,
        id,
    }
}

function receiveJob(id, job) {
    return {
        type: FETCH_JOB_SUCCESS,
        id,
        job,
    }
}

function jobError(id, message) {
    return {
        type: FETCH_JOB_FAILURE,
        id,
        message,
    }
}

export function fetchJob(id) {
    return (dispatch) => {

        dispatch(requestJob(id));

        return axiosMainApi({
            url: `jobs/${id}`,
            method: 'get',
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveJob(id, response.data));
            } else {
                dispatch(jobError(id, 'Failed to load job'));
            }
            return response;
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(jobError(id, response && response.message ? response.message : 'Failed to load jobs'));
            } else {
                dispatch(jobError(id, 'No response received'));
            }
        });
    }
}
