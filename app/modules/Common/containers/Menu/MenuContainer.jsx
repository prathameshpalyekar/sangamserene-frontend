import React from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Menu from '../../components/Menu/Menu.jsx';

import { subscribeMessagesCount } from '../../../Chat/actions/chat.js';
import { subscribeNotificationsCount } from '../../../Notifications/actions/notifications.js';

const mapStateToProps = state => {
    const userState = state.getIn(['auth', 'user']);
    const chatState = state.getIn(['chat', 'messageCount']);
    const notificationsState = state.getIn(['notifications', 'notificationsCount']);

    let unReadMessages = userState ? userState.get('unreadMessagesCount') : 0;
    if (chatState && userState && userState.get('id') === chatState.get('userId')) {
        unReadMessages = chatState.get('unReadCount');
    }

    let unReadNotifications = userState ? userState.get('unreadCount') : 0;
    if (notificationsState && userState && userState.get('id') === notificationsState.get('userId')) {
        unReadNotifications = notificationsState.get('unReadCount');
    }

    return {
        unReadMessages,
        unReadNotifications
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        goToPage (page) {
            dispatch(push(page));
        },
        subscribeMessagesCount () {
            dispatch(subscribeMessagesCount());
        },
        subscribeNotificationsCount () {
            dispatch(subscribeNotificationsCount());
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
