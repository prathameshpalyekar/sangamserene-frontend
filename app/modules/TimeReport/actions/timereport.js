import axiosMainApi from 'components/axiosMainApi'

import {
    FETCH_TIMEREPORT_REQUEST,
    FETCH_TIMEREPORT_SUCCESS,
    FETCH_TIMEREPORT_FAILURE,
    UPDATE_SHIFT_REQUEST,
    UPDATE_SHIFT_SUCCESS,
    UPDATE_SHIFT_FAILURE
} from './actionTypes.js';

function requestTimeReport(id) {
    return {
        type: FETCH_TIMEREPORT_REQUEST,
        id
    }
}

function receiveTimeReport(id, timereport) {
    return {
        type: FETCH_TIMEREPORT_SUCCESS,
        id,
        timereport
    }
}

function timeReportError(id, message) {
    return {
        type: FETCH_TIMEREPORT_FAILURE,
        id,
        message
    }
}

function requestUpdateShift(id) {
    return {
        type: UPDATE_SHIFT_REQUEST,
        id
    }
}

function receiveUpdateShift(id) {
    return {
        type: UPDATE_SHIFT_SUCCESS,
        id
    }
}

function updateShiftError(id, message) {
    return {
        type: UPDATE_SHIFT_FAILURE,
        id,
        message
    }
}

export function fetchTimeReport(id) {
    return (dispatch) => {

        dispatch(requestTimeReport(id));

        return axiosMainApi({
            url: `jobs/${id}/timereport`,
            method: 'get',
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveTimeReport(id, response.data));
            } else {
                dispatch(timeReportError(id, 'Failed to fetch timereport.'));
            }
            return response;
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(timeReportError(id, response && response.message ? response.message : 'Failed to fetch timereport.'));
            } else {
                dispatch(timeReportError(id, 'No response received'));
            }
        });
    }
}

export function approveShiftReport(jobId, shiftReportId) {
    return (dispatch) => {

        dispatch(requestUpdateShift(shiftReportId));

        return axiosMainApi({
            url: `jobs/${jobId}/shift/${shiftReportId}/approve`,
            method: 'post',
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveUpdateShift(shiftReportId));
                dispatch(receiveTimeReport(jobId, response.data));
            } else {
                dispatch(updateShiftError(shiftReportId, 'Failed to update shift report'));
            }
            return response;
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(updateShiftError(shiftReportId, response && response.message ? response.message : 'Failed to update shift report.'));
            } else {
                dispatch(updateShiftError(shiftReportId, 'No response received'));
            }
        });
    }
}

export function disapproveShiftReport(jobId, shiftReportId) {
    return (dispatch) => {

        dispatch(requestUpdateShift(shiftReportId));

        return axiosMainApi({
            url: `jobs/${jobId}/shift/${shiftReportId}/reject`,
            method: 'post',
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveUpdateShift(shiftReportId));
                dispatch(receiveTimeReport(jobId, response.data));
            } else {
                dispatch(updateShiftError(shiftReportId, 'Failed to update shift report'));
            }
            return response;
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(updateShiftError(shiftReportId, response && response.message ? response.message : 'Failed to update shift report.'));
            } else {
                dispatch(updateShiftError(shiftReportId, 'No response received'));
            }
        });
    }
}
