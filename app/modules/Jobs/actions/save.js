import axiosMainApi from 'components/axiosMainApi'

import {
    SAVE_REQUEST,
    SAVE_SUCCESS,
    SAVE_FAILURE,
} from './actionTypes.js';

function requestSave(job) {
    return {
        type: SAVE_REQUEST,
        job,
    }
}

function receiveSave(job, savedJob) {
    return {
        type: SAVE_SUCCESS,
        job,
        savedJob,
    }
}

function saveError(job, message) {
    return {
        type: SAVE_FAILURE,
        job,
        message,
    }
}

export function saveJob(job) {
    return (dispatch) => {

        dispatch(requestSave(job));

        const { id, ...withoutId } = job;

        return axiosMainApi({
            url: id ? `jobs/${id}` : `jobs`,
            method: 'post',
            data: withoutId,
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveSave(job, response.data));
            } else {
                dispatch(saveError(job, 'Failed to save job'));
            }
            return response;
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(saveError(job, response && response.message ? response.message : 'Failed to save job'));
            } else {
                dispatch(saveError(job, 'No response received'));
            }
        });
    }
}

export function updatePublishJob(job) {
    return (dispatch) => {

        dispatch(requestSave(job));

        const { id, ...withoutId } = job;

        return axiosMainApi({
            url: `jobs/${id}`,
            method: 'put',
            data: withoutId,
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveSave(job, response.data));
            } else {
                dispatch(saveError(job, 'Failed to save job'));
            }
            return response;
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(saveError(job, response && response.message ? response.message : 'Failed to save job'));
            } else {
                dispatch(saveError(job, 'No response received'));
            }
        });
    }
}
