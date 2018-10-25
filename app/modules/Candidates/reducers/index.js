import Immutable from 'immutable';

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
} from '../actions/actionTypes.js';

const candidates = (state = Immutable.fromJS({
    selectedJob: {},
    byFilterType: {},
    byCandidateType: {},
    candidates: {},
    isFetching: false,
    fetchingCandidates: false,
}), action = {}) => {
    switch (action.type) {
        case CANDIDATES_FOR_JOB:
            return state.set('selectedJob', action.job);
        case CANDIDATES_FOR_JOB_REQUEST:
            return state.setIn(['byFilterType', action.filterType, 'isFetching'], true)
                .setIn(['byFilterType', action.filterType, 'errorMessage'], '');
        case CANDIDATES_FOR_JOB_SUCCESS:
            return state.setIn(['byFilterType', action.filterType, 'isFetching'], false)
                .setIn(['byFilterType', action.filterType, 'errorMessage'], '')
                .setIn(['byFilterType', action.filterType, 'job'], action.data);
        case CANDIDATES_FOR_JOB_FAILURE:
            return state.setIn(['byFilterType', action.filterType, 'isFetching'], false)
                .setIn(['byFilterType', action.filterType, 'errorMessage'], action.message);
        case CANDIDATE_PROFILE_REQUEST:
            return state.set('isFetching', true).set('errorMessage', '');
        case CANDIDATE_PROFILE_SUCCESS:
            return state.set('isFetching', false).set('errorMessage', '')
                .set('candidate', action.candidate);
        case CANDIDATE_PROFILE_FAILURE:
            return state.set('isFetching', false).set('errorMessage', action.message);
        case CANDIDATES_BY_TYPE_REQUEST:
            return state.setIn(['byCandidateType', action.candidateType, 'isFetching'], true)
                .setIn(['byCandidateType', action.candidateType, 'errorMessage'], '');
        case CANDIDATES_BY_TYPE_SUCCESS:
            return state.setIn(['byCandidateType', action.candidateType, 'isFetching'], false)
                .setIn(['byCandidateType', action.candidateType, 'errorMessage'], '')
                .setIn(['byCandidateType', action.candidateType, 'candidates'], Immutable.fromJS(action.candidates));
        case CANDIDATES_BY_TYPE_FAILURE:
            return state.setIn(['byCandidateType', action.candidateType, 'isFetching'], false)
                .setIn(['byCandidateType', action.candidateType, 'errorMessage'], action.message);
        case CANDIDATES_FOR_NOTIFICATIONS_REQUEST:
            return state.set('fetchingCandidates', true).set('fetchCanidatesError', '');
        case CANDIDATES_FOR_NOTIFICATIONS_SUCCESS:
            return state.set('fetchingCandidates', false).set('fetchCanidatesError', '');
        case CANDIDATES_FOR_NOTIFICATIONS_FAILURE:
            return state.set('fetchingCandidates', false).set('fetchCanidatesError', action.message);
        case CREATE_REVIEW_REQUEST:
            return state.set('submittingReview', true).set('submitReviewSuccess', false).set('submitReviewError', '');
        case CREATE_REVIEW_SUCCESS:
            return state.set('submittingReview', false).set('submitReviewSuccess', true).set('submitReviewError', '');
        case CREATE_REVIEW_FAILURE:
            return state.set('submittingReview', false).set('submitReviewSuccess', false).set('submitReviewError', action.message);
        default:
            return state;
    }
}

export default candidates;
