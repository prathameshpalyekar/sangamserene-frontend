import Immutable from 'immutable';

import {
    NOTIFICATIONS_REQUEST,
    NOTIFICATIONS_SUCCESS,
    NOTIFICATIONS_FAILURE,
    NOTIFICATIONS_COUNT_RECEIVED,
    NOTIFICATIONS_DELETE_REQUEST,
    NOTIFICATIONS_DELETE_SUCCESS,
    NOTIFICATIONS_DELETE_FAILURE,
    NEW_NOTIFICATION,
} from '../actions/actionTypes.js';

const notifications = (state = Immutable.fromJS({
    notifications: {},
    isFetching: false,
    notificationsCount: {},
}), action = {}) => {
    switch (action.type) {
        case NOTIFICATIONS_REQUEST:
            return state.set('isFetching', true).set('errorMessage', '');
        case NOTIFICATIONS_SUCCESS:
            return state.set('isFetching', false).set('errorMessage', '')
                .set('notifications', Immutable.fromJS(action.notifications));
        case NOTIFICATIONS_FAILURE:
            return state.set('isFetching', false).set('errorMessage', action.message);
        case NOTIFICATIONS_DELETE_REQUEST:
            return state.set('deleteErrorMessage', '');
        case NOTIFICATIONS_DELETE_SUCCESS:
            return markNotificationsRead(state, action);
        case NOTIFICATIONS_DELETE_FAILURE:
            return state.set('deleteErrorMessage', action.message);
        case NOTIFICATIONS_COUNT_RECEIVED:
            return state.set('notificationsCount', Immutable.fromJS(action.data));
        case NEW_NOTIFICATION:
            const notifications = state.get('notifications').toJS();
            return state.set('notifications', Immutable.fromJS([action.notification, ...notifications]));
        default:
            return state;
    }
}

function markNotificationsRead(state, action) {
    const notifications = state.get('notifications').map(n => {
        return n.set('read', true);
    });

    return state.set('notifications', notifications).set('deleteErrorMessage', '');
}

export default notifications;
