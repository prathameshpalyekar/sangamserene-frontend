import axiosMainApi from 'components/axiosMainApi'

import { uploadPictureUri } from '../helpers/pictureUploader.js';

import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_AVATAR_REQUEST,
    UPDATE_AVATAR_SUCCESS,
    UPDATE_AVATAR_FAIL,
} from './actionTypes.js';

import{
    UPDATE_USER_PROFILE_PIC,
} from '../../Auth/actions/actionTypes.js';

import {
    RECEIVE_UPDATED_USER
} from '../../Auth/actions/actionTypes.js';

function updateProfileRequest(userInfo) {
    return {
        type: UPDATE_PROFILE_REQUEST,
        userInfo
    }
};

function updateProfileSuccess() {
    return {
        type: UPDATE_PROFILE_SUCCESS
    }
};

function updateProfileFail(message) {
    return {
        type: UPDATE_PROFILE_FAIL,
        message
    }
};

function receiveUpdatedUser(response) {
    return {
        type: RECEIVE_UPDATED_USER,
        user: response.data.user ? response.data.user : response.data
    }
}

function requestUpdateAvatar() {
    return {
        type: UPDATE_AVATAR_REQUEST,
    }
}

function receiveUpdateAvatar() {
    return {
        type: UPDATE_AVATAR_SUCCESS,
    }
}

function updateUserProfilePic(profilePic) {
    return {
        type: UPDATE_USER_PROFILE_PIC,
        profilePic,
    }
}

function errorUpdateAvatar(message) {
    return {
        type: UPDATE_AVATAR_FAIL,
        message,
    }
}

export function updateProfile (userId, userInfo) {
    const requestData = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phoneNumber: userInfo.phoneNumber,
        address: userInfo.address,
        zipCode: userInfo.zipCode,
        place: userInfo.place,
        employerInfo:{
            companyName: userInfo.company,
            billingInfo: {
                companyName: userInfo.billingInfoCompanyName,
                invoiceRef: userInfo.invoiceRef,
                invoiceEmail: userInfo.invoiceEmail,
                invoiceAddress: userInfo.invoiceAddress,
                invoiceZipCode: userInfo.invoiceZipCode,
                invoicePlace: userInfo.invoicePlace,
                invoiceVat: userInfo.invoiceVat,
                corporateNum: userInfo.corporateNum
            }
        }
    }

    return (dispatch) => {
        dispatch(updateProfileRequest(requestData));
        return axiosMainApi.request({
            url: 'user/${userId}',
            method: 'PUT',
            data: requestData
        }).then((xhrResponse) => {
            if (xhrResponse && xhrResponse.data) {
                dispatch(updateProfileSuccess(xhrResponse.data));
                dispatch(receiveUpdatedUser(xhrResponse.data));
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

            dispatch(updateProfileFail(message));
        });
    };
}

export function updateUserAvatar(userId, file) {
    return (dispatch) => {
        uploadPictureUri(file, (response) => {
            dispatch(requestUpdateAvatar());

            return axiosMainApi.request({
                url: 'user/${userId}/updateprofilepic',
                method: 'PUT',
                data: {profilePic: response.profilePic}
            }).then((xhrResponse) => {
                if (xhrResponse && xhrResponse.data) {
                    dispatch(receiveUpdateAvatar());
                    dispatch(updateUserProfilePic(response.profilePic));
                }
            }).catch((error) => {
                let message = error.message;
                if (error.response) {
                    if (error.response.data) {
                        message = error.response.data.message || 'Failed';
                    } else {
                        message = 'Failed';
                    }
                } else if (error.request) {
                    message = 'We failed to receive response';
                }
                dispatch(errorUpdateAvatar(message));
            });
        }, (error) => {
            dispatch(errorUpdateAvatar(error));
        });
    }
}
