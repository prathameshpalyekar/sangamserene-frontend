import axiosMainApi from 'components/axiosMainApi';
import { push } from 'react-router-redux';

import {
    CANDIDATES_FOR_JOB,
    CANDIDATES_FOR_JOB_REQUEST,
    CANDIDATES_FOR_JOB_SUCCESS,
    CANDIDATES_FOR_JOB_FAILURE,
    CANDIDATE_PROFILE_REQUEST,
    CANDIDATE_PROFILE_SUCCESS,
    CANDIDATE_PROFILE_FAILURE,
    CANDIDATES_BY_TYPE_REQUEST,
    CANDIDATES_BY_TYPE_SUCCESS,
    CANDIDATES_BY_TYPE_FAILURE,

    CANDIDATES_FOR_NOTIFICATIONS_REQUEST,
    CANDIDATES_FOR_NOTIFICATIONS_SUCCESS,
    CANDIDATES_FOR_NOTIFICATIONS_FAILURE,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAILURE,
} from './actionTypes.js';

import {
    RECEIVE_UPDATED_USER
} from '../../Auth/actions/actionTypes.js';

import { newBroadcastConversation } from '../../Chat/actions/chat.js';

function storeSelectedJob(job) {
    return {
        type: CANDIDATES_FOR_JOB,
        job
    }
}

function requestCandidatesForJob(filterType) {
    return {
        type: CANDIDATES_FOR_JOB_REQUEST,
        filterType
    }
}

function receiveCandidatesForJob(filterType, data) {
    return {
        type: CANDIDATES_FOR_JOB_SUCCESS,
        filterType,
        data
    }
}

function candidatesForJobError(filterType, message) {
    return {
        type: CANDIDATES_FOR_JOB_FAILURE,
        filterType,
        message
    }
}

function requestCandidateProfile() {
    return {
        type: CANDIDATE_PROFILE_REQUEST
    }
}

function receiveCandidateProfile(candidate) {
    return {
        type: CANDIDATE_PROFILE_SUCCESS,
        candidate
    }
}

function candidateProfileError(message) {
    return {
        type: CANDIDATE_PROFILE_FAILURE,
        message
    }
}

function receiveUpdatedUser(response) {
    return {
        type: RECEIVE_UPDATED_USER,
        user: response.data.user ? response.data.user : response.data
    }
}

function requestCandidatesByType(candidateType) {
    return {
        type: CANDIDATES_BY_TYPE_REQUEST,
        candidateType
    }
}

function receiveCandidatesByType(candidateType, candidates) {
    return {
        type: CANDIDATES_BY_TYPE_SUCCESS,
        candidates,
        candidateType
    }
}

function errorCandidatesByType(candidateType, message) {
    return {
        type: CANDIDATES_BY_TYPE_FAILURE,
        message,
        candidateType
    }
}

function requestCandidatesForNotifications() {
    return {
        type: CANDIDATES_FOR_NOTIFICATIONS_REQUEST
    }
}

function receiveCandidatesForNotifications() {
    return {
        type: CANDIDATES_FOR_NOTIFICATIONS_SUCCESS
    }
}

function errorCandidatesForNotifications(message) {
    return {
        type: CANDIDATES_FOR_NOTIFICATIONS_FAILURE,
        message
    }
}

function requestCreateReview() {
    return {
        type: CREATE_REVIEW_REQUEST,
    }
}

function receiveCreateReview() {
    return {
        type: CREATE_REVIEW_SUCCESS,
    }
}

function errorCreateReview(message) {
    return {
        type: CREATE_REVIEW_FAILURE,
        message
    }
}

export function candidateJobProfile(candidateId, jobId) {
    return (dispatch) => {
        dispatch(requestCandidateProfile());
        return axiosMainApi({
            url: `jobs/${jobId}/candidate/${candidateId}`,
            method: 'get'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveCandidateProfile(response.data));
            } else {
                dispatch(candidateProfileError('Failed to load candidates for job'));
            }
        }).catch(xhrResponse => {
            const response = xhrResponse.data;
            dispatch(candidateProfileError(response && response.message));
        });
    }
}

export function candidateProfile(candidateId) {
    return (dispatch) => {
        dispatch(requestCandidateProfile());
        return axiosMainApi({
            url: `user/candidate/${candidateId}`,
            method: 'get'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveCandidateProfile(response.data));
            } else {
                dispatch(candidateProfileError('Failed to load candidates for job'));
            }
        }).catch(xhrResponse => {
            const response = xhrResponse.data;
            dispatch(candidateProfileError(response && response.message));
        });
    }
}

export function openCandidatesList(job) {
    return (dispatch) => {
        const path = `/dashboard/job/${job.id}/candidates/matching`;
        dispatch(storeSelectedJob(job));
        dispatch(push(path));
    }
}

export function fetchCandidatesList(jobId, type) {
    return (dispatch) => {
        dispatch(requestCandidatesForJob(type));
        return axiosMainApi({
            url: `jobs/${jobId}/candidates/${type.toLowerCase()}`,
            method: 'get'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveCandidatesForJob(type, response.data));
            } else {
                dispatch(candidatesForJobError(type, 'Failed to load candidates for job'));
            }
        }).catch(xhrResponse => {
            const response = xhrResponse.data;
            dispatch(candidatesForJobError(type, response && response.message));
        });
    }
}

function fetchCandidatesForNotifications(jobId, type) {
    return new Promise(function(resolve, reject) {
        axiosMainApi({
            url: `jobs/${jobId}/candidates/${type.toLowerCase()}`,
            method: 'get'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                resolve([type, response.data.candidates]);
            } else {
                reject();
            }
        }).catch(xhrResponse => {
            reject();
        });
    });
}

function checkCandidateExists(employeeId, candidates) {
    const selectedCandidate = candidates.find(c => {
        return (c.id === employeeId);
    });

    return candidates && selectedCandidate;
}

export function fetchCandidatesListForNotifications(jobId, employeeId) {
    return (dispatch) => {
        dispatch(requestCandidatesForNotifications());
        return Promise.all([
            fetchCandidatesForNotifications(jobId, 'offersent'),
            fetchCandidatesForNotifications(jobId, 'hired')
        ]).then(allPromises => {
            const offersentCandidate = allPromises[0][1];
            const hiredCandidate = allPromises[1][1];
            if (offersentCandidate.length && checkCandidateExists(employeeId, offersentCandidate)) {
                dispatch(receiveCandidatesForNotifications());
                dispatch(push({
                    pathname: `/dashboard/job/${jobId}/candidates/offersent`,
                    state: {
                        candidateId: employeeId
                    }
                }));
            } else if (hiredCandidate.length && checkCandidateExists(employeeId, hiredCandidate)) {
                dispatch(receiveCandidatesForNotifications());
                dispatch(push({
                    pathname: `/dashboard/job/${jobId}/candidates/hired`,
                    state: {
                        candidateId: employeeId
                    }
                }));
            } else {
                dispatch(errorCandidatesForNotifications('Kandidaten är inte längre tillgänglig för det här jobbet.'));
            }
        }).catch(err => {
            dispatch(errorCandidatesForNotifications('Kandidaten är inte längre tillgänglig för det här jobbet.'));
        });
    }
}

export function fetchCandidatesListForChat(job, type) {
    return (dispatch) => {
        return axiosMainApi({
            url: `jobs/${job.id}/candidates/${type.toLowerCase()}`,
            method: 'get'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                const users = (response.data.candidates || []).filter(u => !u.isReportedSick && !u.isNoShow);
                dispatch(newBroadcastConversation(job, users));
            } else {
                // Error
            }
        }).catch(xhrResponse => {
            const response = xhrResponse.data;
            // Error
        });
    }
}
/*
export function sendJobOffer(employeeId, jobId) {
    return (dispatch) => {
        return axiosMainApi({
            url: `jobs/${jobId}/sendoffer/${employeeId}`,
            method: 'post'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                const { data } = response;
                //route to open jobs
            } else {
                //dispatch errorView
            }
        }).catch(xhrResponse => {
            const response = xhrResponse.data;
            //dispatch errorView
        });
    }
}*/

export function createEmployerContract(employeeId, jobId) {
    return (dispatch) => {
        // dispatch loader or update store
        return axiosMainApi({
            url: `contract/employer/employee/${employeeId}/job/${jobId}`,
            method: 'post'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                const { data } = response;
                if (data.scriveDocStatus === 'closed') {
                    //Scrive already signed
                    const path = `/dashboard/job/${jobId}/candidates/offersent`;
                    dispatch(push(path));
                } else { // open scrive in new tab
                    //cordova.InAppBrowser.open(data.signingUrl , '_system', 'location=no');
                    window.location = data.signingUrl;
                    //let scrivePopup = window.open(data.signingUrl,'scrive','height=500, width=500, toolbar=0');
                    //scrivePopup.window.focus();
                }
            } else {
                //dispatch errorView
            }
        }).catch(xhrResponse => {
            const response = xhrResponse.data;
            //dispatch errorView
        });
    }
}

export function saveCandidate(employeeId) {
    return (dispatch) => {
        return axiosMainApi({
            url: `user/${employeeId}/savecandidate`,
            method: 'post'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveUpdatedUser(response));
            } else {
                //dispatch errorView
            }
        }).catch(xhrResponse => {
            //dispatch errorView
        });
    }
}

export function removeCandidateFromSaved(employerId, candidateId) {
    return (dispatch) => {
        return axiosMainApi({
            url: `user/${employerId}/candidate/${candidateId}`,
            method: 'delete'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveUpdatedUser(response));
            } else {
                //dispatch errorView
            }
        }).catch(xhrResponse => {
            //dispatch errorView
        });
    }
}

export function candidateNoShow(employeeId, jobId) {
    return (dispatch) => {
        return axiosMainApi({
            url: `jobs/${jobId}/noshow/${employeeId}`,
            method: 'post'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveCandidateJobProfile(response.data));
                dispatch(fetchCandidatesList(jobId, 'hired'));
            } else {
                //dispatch errorView
            }
        }).catch(xhrResponse => {
            //dispatch errorView
        });
    }
}

export function candidateTakeAway(employeeId, jobId) {
    const type = 'matching';
    return (dispatch) => {
        return axiosMainApi({
            url: `jobs/${jobId}/removejobcandidate/${employeeId}`,
            method: 'delete'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveCandidatesForJob(type, response.data));
            } else {
                //dispatch errorView
            }
        }).catch(xhrResponse => {
            //dispatch errorView
        });
    }
}

export function getCandidatesByType(employerId, type) {
    return (dispatch) => {
        dispatch(requestCandidatesByType(type));
        return axiosMainApi({
            url: `user/${employerId}/${type}candidates`,
            method: 'get'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveCandidatesByType(type, response.data));
            } else {
                dispatch(errorCandidatesByType(type, 'Failed to load candidates'));
            }
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(errorCandidatesByType(type, response && response.message ? response.message : 'Failed to load candidates by type'));
            } else {
                dispatch(errorCandidatesByType(type, 'No response received'));
            }
        });
    }
}

export function createReviewForJob(data, jobId, employeeId) {
    return (dispatch) => {
        dispatch(errorCreateReview());
        return axiosMainApi({
            url: `jobs/${jobId}/review/${employeeId}`,
            data,
            method: 'post'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveCreateReview());
            } else {
                dispatch(errorCreateReview('Failed to create review'));
            }
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(errorCreateReview(response && response.message ? response.message : 'Failed to create review'));
            } else {
                dispatch(errorCreateReview('No response received'));
            }
        });
    }
}

export function createReview(data, employeeId) {
    return (dispatch) => {
        dispatch(errorCreateReview());
        return axiosMainApi({
            url: `user/${employeeId}/review`,
            data,
            method: 'post'
        }).then((xhrResponse) => {
            const response = xhrResponse.data;
            if (!response.error) {
                dispatch(receiveCreateReview());
            } else {
                dispatch(errorCreateReview('Failed to create review'));
            }
        }).catch(xhrResponse => {
            if (xhrResponse.response) {
                const response = xhrResponse.response.data;
                dispatch(errorCreateReview(response && response.message ? response.message : 'Failed to create review'));
            } else {
                dispatch(errorCreateReview('No response received'));
            }
        });
    }
}
