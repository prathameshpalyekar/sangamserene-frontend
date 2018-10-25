import React, { Component } from 'react';
import Alert from 'react-s-alert';

import Loader from 'components/Loader';

import NotificationsHeaderContainer from '../containers/NotificationsHeaderContainer.jsx';
import NotificationsListItemContainer from '../containers/NotificationsListItemContainer.jsx';

import '../less/Notifications.less';

class Notifications extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchNotifications();
        this.props.subscribeNotification();
    }

    componentWillUnmount() {
        this.props.unSubscribeNotification();
    }

    componentWillReceiveProps(nextProps) {
        if ( !this.props.fetchCanidatesError && nextProps.fetchCanidatesError) {
            Alert.error(nextProps.fetchCanidatesError);
        }
    }

    render() {
        const { notifications, isFetching, fetchingCandidates, fetchCanidatesError } = this.props;

        if (isFetching || fetchingCandidates) {
            return (
                <Loader />
            );
        }

        return (
            <div className="notifications-wrap">
                <NotificationsHeaderContainer hideOptions={notifications.size === 0} />
                {
                    notifications.valueSeq().map((notification, index) => {
                        return (
                            <NotificationsListItemContainer notification={notification} key={index} />
                        );
                    })
                }
                {
                    notifications.size === 0
                    ?
                    <div className="no-records-wrap">
                        <p>
                            Just nu har du inga olästa notifikationer!
                        </p>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

export default Notifications;
