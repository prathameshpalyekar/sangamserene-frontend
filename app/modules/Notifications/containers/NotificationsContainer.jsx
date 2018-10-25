import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Notifications from '../views/Notifications.jsx';

import { fetchNotifications, subscribeNotification, unSubscribeNotification } from '../actions/notifications.js';

const mapStateToProps = (state) => {
    const notificationsState = state.get('notifications');
    const candidatesState = state.get('candidates');
    return {
        notifications: notificationsState.get('notifications'),
        isFetching: notificationsState.get('isFetching'),
        fetchingCandidates: candidatesState.get('fetchingCandidates'),
        fetchCanidatesError: candidatesState.get('fetchCanidatesError'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotifications () {
            dispatch(fetchNotifications());
        },
        subscribeNotification () {
            dispatch(subscribeNotification());
        },
        unSubscribeNotification () {
            dispatch(unSubscribeNotification());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
