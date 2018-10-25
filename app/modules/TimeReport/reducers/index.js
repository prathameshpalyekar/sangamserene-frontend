import Immutable from 'immutable';

import {
    FETCH_TIMEREPORT_REQUEST,
    FETCH_TIMEREPORT_SUCCESS,
    FETCH_TIMEREPORT_FAILURE,
    UPDATE_SHIFT_REQUEST,
    UPDATE_SHIFT_SUCCESS,
    UPDATE_SHIFT_FAILURE
} from '../actions/actionTypes.js';

const timereport = (state = Immutable.fromJS({
    jobs: {},
    shifts: {},
    jobsWithoutCancel: {}
}), action) => {
    switch (action.type) {
        case FETCH_TIMEREPORT_REQUEST:
            return state.setIn(['jobs', action.id], Immutable.fromJS({
                fetching: true,
                fetchError: false,
            }));
        case FETCH_TIMEREPORT_SUCCESS:
            return state.setIn(['jobs', action.id], Immutable.fromJS({
                fetching: false,
                fetchError: false,
                timereport: action.timereport,
            }));
        case FETCH_TIMEREPORT_FAILURE:
            return state.setIn(['jobs', action.id], Immutable.fromJS({
                fetching: false,
                fetchError: action.errorMessage,
            }));
        case UPDATE_SHIFT_REQUEST:
            return state.setIn(['shifts', action.id], Immutable.fromJS({
                fetching: true,
                fetchError: false,
            }));
        case UPDATE_SHIFT_SUCCESS:
            return state.setIn(['shifts', action.id], Immutable.fromJS({
                fetching: false,
                fetchError: false
            }));
        case UPDATE_SHIFT_FAILURE:
            return state.setIn(['shifts', action.id], Immutable.fromJS({
                fetching: false,
                fetchError: action.errorMessage,
            }));
        default:
            return state
    }
}

export default timereport;
