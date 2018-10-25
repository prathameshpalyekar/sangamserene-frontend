import axiosMainApi from 'components/axiosMainApi'

import {
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
} from './actionTypes.js';

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    }
}

function logoutError(message) {
    return {
        type: LOGOUT_FAILURE,
        message,
    }
}

export function logout() {
    return (dispatch) => {

        dispatch(requestLogout());

        return axiosMainApi({
            url: 'logout',
            method: 'post',
            responseType: 'json',
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            dispatch(receiveLogout());
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(logoutError(response && response.message ? response.message : 'Failed to logout user due to Api failure.'));
            } else {
                dispatch(logoutError('No response received'));
            }
        });
    }
}
