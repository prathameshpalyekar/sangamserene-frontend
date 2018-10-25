import axiosMainApi from 'components/axiosMainApi';

import {
    FETCH_ALL_FOR_COPY_REQUEST,
    FETCH_ALL_FOR_COPY_SUCCESS,
    FETCH_ALL_FOR_COPY_FAILURE
} from './actionTypes.js';

function requestCopyAllJobs() {
    return {
        type: FETCH_ALL_FOR_COPY_REQUEST,
        filterType: 'withoutCancel'
    }
}

function receiveCopyAllJobs(jobs) {
    return {
        type: FETCH_ALL_FOR_COPY_SUCCESS,
        filterType: 'withoutCancel',
        jobs
    }
}

function errorCopyAllJobs(message) {
    return {
        type: FETCH_ALL_FOR_COPY_FAILURE,
        filterType: 'withoutCancel',
        message
    }
}

export function jobsWithoutCancel() {
    return (dispatch) => {

        dispatch(requestCopyAllJobs());
        return axiosMainApi({
            url: `jobs/type/all-without-cancel`,
            method: 'get',
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveCopyAllJobs(response.data));
            } else {
                dispatch(errorCopyAllJobs('Failed to load jobs'));
            }
            return response;
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(errorCopyAllJobs(response && response.message ? response.message : 'Failed to load jobs'));
            } else {
                dispatch(errorCopyAllJobs('No response received'));
            }
        });
    }
}
