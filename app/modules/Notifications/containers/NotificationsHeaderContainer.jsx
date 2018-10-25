import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import NotificationsHeader from '../components/NotificationsHeader.jsx';

import { markAllAsRead, deleteAllNotifications } from '../actions/notifications.js';

const mapStateToProps = (state, ownProps) => {
    const notificationsState = state.get('notifications');
    return {
        hideOptions: ownProps.hideOptions,
        deleteErrorMessage: notificationsState.get('deleteErrorMessage'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        markAllAsRead () {
            dispatch(markAllAsRead());
        },
        deleteAllNotifications () {
            dispatch(deleteAllNotifications());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsHeader);
