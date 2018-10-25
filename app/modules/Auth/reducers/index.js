import Immutable from 'immutable';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,

    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,

    VERIFY_LOGIN_REQUEST,
    VERIFY_LOGIN_COMPLETE,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,

    RECEIVE_UPDATED_USER,
    UPDATE_USER_PROFILE_PIC,
} from '../actions/actionTypes.js';

const auth = (state = Immutable.fromJS({
    isFetching: false,
    isAuthenticated: false,
    isVerifyingLogin: true,
    user: false
}), action) => {
    switch (action.type) {
        case VERIFY_LOGIN_REQUEST:
            return state.merge({
                isVerifyingLogin: true,
            });
        case VERIFY_LOGIN_COMPLETE:
            return state.merge({
                isVerifyingLogin: false,
            });
        case LOGIN_REQUEST:
            return state.merge({
                isFetching: true,
                isAuthenticated: false,
                errorMessage: '',
                user: action.creds
            });
        case LOGIN_SUCCESS:
            return state.merge({
                isVerifyingLogin: false,
                isFetching: false,
                isAuthenticated: true,
                errorMessage: '',
                user: action.user
            });
        case LOGIN_FAILURE:
            return state.merge({
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message,
                user: null
            });
        case LOGOUT_REQUEST:
            return state.merge({
                loggingOut: true
            });
        case LOGOUT_SUCCESS:
            return state.merge({
                loggingOut: false,
                isAuthenticated: false,
                loggedOut: true,
                user: null,
                errorMessage: ''
            });
        case LOGOUT_FAILURE:
            return state.merge({
                loggingOut: false,
                loggedOut: false,
                errorMessage: action.message,
            });
        case SIGNUP_REQUEST:
            return state.merge({
                isFetching: true,
                isAuthenticated: false,
                errorMessage: null,
                user: action.creds,
                signupSuccess: false,
                signupRequested: true,
                signupFailed: false,
                signupFailedMessage: '',
            });
        case SIGNUP_SUCCESS:
            return state.merge({
                isFetching: false,
                isAuthenticated: false,
                errorMessage: null,
                user: action.user,
                signupSuccess: true,
                signupRequested: false,
                signupFailed: false,
                signupFailedMessage: '',
            });
        case SIGNUP_FAIL:
            return state.merge({
                isFetching: false,
                isAuthenticated: false,
                user: null,
                signupRequested: false,
                signupSuccess: false,
                signupFailed: true,
                signupFailedMessage: action.message,
            });
        case FORGOT_PASSWORD_REQUEST:
            return state.merge({
                isFetching: true,
                errorMessage: null,
                forgotPasswordSuccess: false
            });
        case FORGOT_PASSWORD_SUCCESS:
            return state.merge({
                isFetching: false,
                errorMessage: null,
                forgotPasswordSuccess: true
            });
        case FORGOT_PASSWORD_FAILURE:
            return state.merge({
                isFetching: false,
                errorMessage: action.message,
                forgotPasswordSuccess: false
            });
        case RECEIVE_UPDATED_USER:
            return state.merge({
                user: action.user,
            });
        case UPDATE_USER_PROFILE_PIC:
            const user = state.get('user').toJS();
            const updatedUser = {
                ...user,
                profilePic: action.profilePic
            }
            return state.merge({
                user: updatedUser,
            });
        // case SETTINGS_REQUEST:
        //     return state.merge({
        //         isFetching: true,
        //         errorMessage: null
        //     });
        // case SETTINGS_SUCCESS:
        //     return state.merge({
        //         isFetching: false,
        //         user: action.user
        //     });
        // case SETTINGS_FAILURE:
        //     return state.merge({
        //         isFetching: false,
        //         errorMessage: action.message
        //     });
        default:
            return state
    }
}

export default auth;
