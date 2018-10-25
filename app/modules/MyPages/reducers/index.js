import Immutable from 'immutable';

import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_AVATAR_REQUEST,
    UPDATE_AVATAR_SUCCESS,
    UPDATE_AVATAR_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE,
} from '../actions/actionTypes.js';

const myPage = (state = Immutable.fromJS({
    isFetching: false,
    updateProfileSuccess: false,
    password: {},
}), action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return state.merge({
                isFetching: true,
                errorMessage: null,
                updateProfileSuccess: false
            });
        case UPDATE_PROFILE_SUCCESS:
            return state.merge({
                isFetching: false,
                errorMessage: null,
                updateProfileSuccess: true
            });
        case UPDATE_PROFILE_FAIL:
            return state.merge({
                isFetching: false,
                errorMessage: action.message,
                updateProfileSuccess: false
            });
        case UPDATE_AVATAR_REQUEST:
            return state.set('isFetchingAvatar', true).set('fetchingAvatarSuccess', false).set('fetchingAvatarError', '');
        case UPDATE_AVATAR_SUCCESS:
            return state.set('isFetchingAvatar', false).set('fetchingAvatarSuccess', true).set('fetchingAvatarError', '');
        case UPDATE_AVATAR_FAIL:
            return state.set('isFetchingAvatar', false).set('fetchingAvatarSuccess', false).set('fetchingAvatarError', action.message);
        case UPDATE_PASSWORD_REQUEST:
            return state.setIn(['password', 'isFetching'], true)
                .setIn(['password', 'errorMessage'], '')
                .setIn(['password', 'updateSuccess'], false);
        case UPDATE_PASSWORD_SUCCESS:
            return state.setIn(['password', 'isFetching'], false)
                .setIn(['password', 'updateSuccess'], true);
        case UPDATE_PASSWORD_FAILURE:
            return state.setIn(['password', 'isFetching'], false)
                .setIn(['password', 'updateSuccess'], false)
                .setIn(['password', 'errorMessage'], action.message);
        default:
            return state
    }
}

export default myPage;
