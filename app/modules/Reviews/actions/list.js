import axiosMainApi from 'components/axiosMainApi';

import {
    REVIEWS_REQUEST,
    REVIEWS_SUCCESS,
    REVIEWS_FAILURE,
} from './actionTypes.js';

function requestReviews() {
    return {
        type: REVIEWS_REQUEST,
    }
}

function receiveReviews(reviews) {
    return {
        type: REVIEWS_SUCCESS,
        reviews
    }
}

function errorReviews(message) {
    return {
        type: REVIEWS_FAILURE,
        message
    }
}

export function fetchReviews(employerId) {
    return (dispatch) => {
        dispatch(requestReviews());
        return axiosMainApi({
            url: `user/${employerId}/reviews`,
            method: 'get'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveReviews(response.data));
            } else {
                dispatch(errorReviews('Failed to get reviews'));
            }
        }).catch(xhrResponse => {
            const response = xhrResponse.data;
            dispatch(errorReviews(response && response.message));
        });
    }
}
