import axiosMainApi from 'components/axiosMainApi'

import {
    CANCEL_REQUEST,
    CANCEL_SUCCESS,
    CANCEL_FAILURE,
} from './actionTypes.js';

function requestCancel(jobId) {
    return {
        type: CANCEL_REQUEST,
        jobId,
    }
}

function receiveCancel(jobId) {
    return {
        type: CANCEL_SUCCESS,
        jobId,
    }
}

function cancelError(jobId, message) {
    return {
        type: CANCEL_FAILURE,
        jobId,
        message,
    }
}


export function cancelJob(id) {
    return (dispatch) => {

        dispatch(requestCancel(id));

        return axiosMainApi({
            url: `jobs/${id}/cancel`,
            method: 'delete',
            data: {
                job_id: id,
            },
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveCancel(id, response.data));
            } else {
                dispatch(cancelError(id, 'Failed to cancel job'));
            }
            return response;
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(cancelError(id, response && response.message ? response.message : 'Failed to cancel job'));
            } else {
                dispatch(cancelError(id, 'No response received'));
            }
        });
    }
}
