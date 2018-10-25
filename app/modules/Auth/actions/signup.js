import axiosMainApi from 'components/axiosMainApi'

import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL
} from './actionTypes.js';

import {login} from './login.js';

function signupRequest(userInfo) {
    return {
        type: SIGNUP_REQUEST,
        userInfo
    }
};

function signupSuccess() {
    return {
        type: SIGNUP_SUCCESS
    }
};

function signupFail(message) {
    return {
        type: SIGNUP_FAIL,
        message
    }
};

export function signUp (userInfo) {

    const requestData = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password,
        confirm_password: userInfo.confirm_password,
        employeeType: 'employer',
        employerInfo:{companyName: userInfo.company},
        acceptTerms: userInfo.acceptTerms
    }

    return (dispatch) => {
        dispatch(signupRequest(requestData));
        return axiosMainApi.request({
            url: 'signup',
            method: 'POST',
            data: requestData
        }).then((xhrResponse) => {
            if (xhrResponse && xhrResponse.data) {
                dispatch(login({
                    email: userInfo.email,
                    password: userInfo.password
                }));
                dispatch(signupSuccess(xhrResponse.data));
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

            dispatch(signupFail(message));
        });
    };
}
