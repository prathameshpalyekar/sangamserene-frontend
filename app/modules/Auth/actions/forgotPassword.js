import axiosMainApi from 'components/axiosMainApi'

import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE
} from './actionTypes.js';

import {login} from './login.js';

function forgotPasswordRequest(email) {
    return {
        type: FORGOT_PASSWORD_REQUEST,
        email
    }
};

function forgotPasswordSuccess() {
    return {
        type: FORGOT_PASSWORD_SUCCESS
    }
};

function forgotPasswordFailure(message) {
    return {
        type: FORGOT_PASSWORD_FAILURE,
        message
    }
};

export function forgotPassword (form) {

    const requestData = {
        email: form.email,
    }

    return (dispatch) => {
        dispatch(forgotPasswordRequest(requestData));
        return axiosMainApi.request({
            url: 'reset_password',
            method: 'POST',
            data: requestData
        }).then((xhrResponse) => {
            if (xhrResponse && xhrResponse.data) {
                dispatch(forgotPasswordSuccess(xhrResponse.data));
            }
        }).catch((error) => {
            let message;
            if (error.response) {
                if (error.response.data) {
                    message = error.response.data.message || 'Failed';
                } else {
                    message = 'Failed';
                }
            } else if (error.request) {
                message = 'We failed to receive response';
            } else {
                message = error.message;
            }

            dispatch(forgotPasswordFailure(message));
        });
    };
}
