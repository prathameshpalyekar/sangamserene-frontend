import axiosMainApi from 'components/axiosMainApi'

import {
    VERIFY_LOGIN_REQUEST,
    VERIFY_LOGIN_COMPLETE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from './actionTypes.js';

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        creds,
    }
}

function requestVerifyLogin() {
    return {
        type: VERIFY_LOGIN_REQUEST,
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        user,
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        message,
    }
}

function loginVerifyComplete() {
    return {
        type: VERIFY_LOGIN_COMPLETE,
    }
}

export function login(creds) {
    return (dispatch) => {

        dispatch(requestLogin(creds));

        return axiosMainApi({
            url: 'login',
            method: 'post',
            responseType: 'json',
            withCredentials: true,
            data: Object.assign({}, creds, {
                strategy: 'cookie',
            }),
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (response.data) {
                dispatch(receiveLogin(response.data));
            } else {
                dispatch(loginError('Failed to login'));
            }
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(loginError(response && response.message ? response.message : 'Failed to login user due to Api failure.'));
            } else {
                dispatch(loginError('No response received'));
            }
        });
    }
}

export function verifyLogin(creds) {
    return (dispatch) => {

        dispatch(requestVerifyLogin(creds));

        return axiosMainApi({
            url: 'user',
            method: 'get',
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (response.data) {
                dispatch(receiveLogin(response.data));
            } else {
                dispatch(loginVerifyComplete('Failed to verify login'));
            }
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(loginVerifyComplete(response && response.message ? response.message : 'Failed to verify login.'));
            } else {
                dispatch(loginVerifyComplete('No response received'));
            }
        });
    }
}
