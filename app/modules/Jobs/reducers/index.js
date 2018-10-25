import Immutable from 'immutable';

import {
    LIST_REQUEST,
    LIST_SUCCESS,
    LIST_FAILURE,

    SAVE_REQUEST,
    SAVE_SUCCESS,
    SAVE_FAILURE,

    CANCEL_REQUEST,
    CANCEL_SUCCESS,
    CANCEL_FAILURE,

    FETCH_JOB_REQUEST,
    FETCH_JOB_SUCCESS,
    FETCH_JOB_FAILURE,

    FETCH_ALL_FOR_COPY_REQUEST,
    FETCH_ALL_FOR_COPY_SUCCESS,
    FETCH_ALL_FOR_COPY_FAILURE

} from '../actions/actionTypes.js';

const jobs = (state = Immutable.fromJS({
    byFilterType: {},
    counts: {},

    cancelJob: {},

    jobs: {},
    jobsWithoutCancel: {}
}), action) => {
    switch (action.type) {
        case LIST_REQUEST:
            return state.setIn(['byFilterType', action.filterType, 'isFetching'], true)
                .setIn(['byFilterType', action.filterType, 'errorMessage'], '');
        case LIST_SUCCESS:
            return state.setIn(['byFilterType', action.filterType, 'isFetching'], false)
                .setIn(['byFilterType', action.filterType, 'errorMessage'], '')
                .set('counts', {
                    completed: action.data.completedJobs,
                    confirmed: action.data.confirmedJobs,
                    draft: action.data.draftJobs,
                    open: action.data.openJobs,
                })
                .setIn(['byFilterType', action.filterType, 'jobs'], action.data.jobs);
        case LIST_FAILURE:
            return state.setIn(['byFilterType', action.filterType, 'isFetching'], false)
                .setIn(['byFilterType', action.filterType, 'errorMessage'], action.message);
        case SAVE_REQUEST:
            return state.mergeIn(['jobs', action.job.id || 'new' ], {
                saving: true,
                saveError: false,
            })
        case SAVE_SUCCESS:
            let st = state;

            if (!action.job.id) {
                st = state.mergeIn(['jobs', 'new'], {
                    saving: false,
                    data: Immutable.fromJS(action.savedJob),
                });
            }

            return st.mergeIn(['jobs', action.savedJob.id], {
                saving: false,
                data: Immutable.fromJS(action.savedJob),
            });
        case SAVE_FAILURE:
            return state.mergeIn(['jobs', action.job.id || 'new' ], {
                saving: false,
                saveError: action.message,
            });
        case CANCEL_REQUEST:
            return state.setIn(['cancelJob', action.jobId], Immutable.fromJS({
                cancelling: true,
                cancelled: false,
                cancelError: '',
            }));
        case CANCEL_SUCCESS:
            return state.setIn(['cancelJob', action.jobId, 'cancelling'], false)
                .setIn(['cancelJob', action.jobId, 'cancelled'], true);
        case CANCEL_FAILURE:
            return state.setIn(['cancelJob', action.jobId, 'cancelling'], false)
                .setIn(['cancelJob', action.jobId, 'cancelled'], false)
                .setIn(['cancelJob', action.jobId, 'cancelError'], action.message);
        case FETCH_JOB_REQUEST:
            return state.setIn(['jobs', action.id], Immutable.fromJS({
                fetching: true,
                fetchError: false,
            }));
        case FETCH_JOB_SUCCESS:
            return state.setIn(['jobs', action.id], Immutable.fromJS({
                fetching: false,
                fetchError: false,
                data: action.job,
            }));
        case FETCH_JOB_FAILURE:
            return state.setIn(['jobs', action.id], Immutable.fromJS({
                fetching: false,
                fetchError: action.errorMessage,
            }));
        case FETCH_ALL_FOR_COPY_REQUEST:
            return state.setIn(['byFilterType', action.filterType, 'isFetching'], true)
                .setIn(['byFilterType', action.filterType, 'errorMessage'], '');
        case FETCH_ALL_FOR_COPY_SUCCESS:
            return state.setIn(['byFilterType', action.filterType, 'isFetching'], false)
                .setIn(['byFilterType', action.filterType, 'errorMessage'], '')
                .set('jobsWithoutCancel', Immutable.fromJS(action.jobs));
        case FETCH_ALL_FOR_COPY_FAILURE:
            return state.setIn(['byFilterType', action.filterType, 'isFetching'], false)
                .setIn(['byFilterType', action.filterType, 'errorMessage'], action.message);
        default:
            return state
    }
}

export default jobs;
