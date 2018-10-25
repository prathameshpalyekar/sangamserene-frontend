import axiosMainApi from 'components/axiosMainApi'

import {
    HOLIDAYS_REQUEST,
    HOLIDAYS_SUCCESS,
    HOLIDAYS_FAILURE,
} from './actionTypes.js';

function requestHolidays() {
    return {
        type: HOLIDAYS_REQUEST,
    }
};

function receiveHolidays(holidays) {
    return {
        holidays,
        type: HOLIDAYS_SUCCESS
    }
};

function holidaysError(message) {
    return {
        type: HOLIDAYS_FAILURE,
        message
    }
};

export function fetchHolidays() {
    return (dispatch) => {
        dispatch(requestHolidays());
        return axiosMainApi.request({
            url: 'holidays',
            method: 'get',
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (response.data) {
                dispatch(receiveHolidays(response.data));
            } else {
                dispatch(holidaysError('Failed to receive holidays'));
            }
        }).catch((xhrResponse) => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(holidaysError(response && response.message ? response.message : 'Failed to fetch holidays due to Api failure.'));
            } else {
                dispatch(holidaysError('No response received'));
            }
        });
    };
}
