import axiosMainApi from 'components/axiosMainApi'

import {
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE,
} from './actionTypes.js';

function updatePasswordRequest() {
    return {
        type: UPDATE_PASSWORD_REQUEST,
    }
}

function updatePasswordSuccess() {
    return {
        type: UPDATE_PASSWORD_SUCCESS,
    }
}

function updatePasswordError(message) {
    return {
        type: UPDATE_PASSWORD_FAILURE,
        message,
    }
}

export function updatePassword(data) {
    return (dispatch) => {

        dispatch(updatePasswordRequest());

        return axiosMainApi({
            url: `update-password`,
            method: 'post',
            data
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(updatePasswordSuccess());
            } else {
                dispatch(updatePasswordError('Det går inte att uppdatera ditt lösenord.'));
            }
            return response;
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(updatePasswordError(response && response.message ? response.message : 'Det går inte att uppdatera ditt lösenord.'));
            } else {
                dispatch(updatePasswordError('Det går inte att uppdatera ditt lösenord.'));
            }
        });
    }
}
