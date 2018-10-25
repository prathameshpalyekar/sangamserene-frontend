import React, { Component } from 'react';
import _ from 'lodash';
import cx from 'classnames';
import moment from 'moment';

import { notificationNameMapper, notificationDescriptionMapper } from '../helpers/notificationMapper.jsx';

const GOOD_NEWS_ACTIONTYPES = ['offer_sent', 'offer_accepted'];

class NotificationsListItem extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { notification } = this.props;
        this.props.markAsRead(notification);
        switch (notification.get('actionType')) {
            case 'new_employee_hired':
                this.props.openHiredCandidatesList(notification.getIn(['from', 'id']))
                break;
            case 'apply':
                this.props.openCandidatesList(notification.get('to'));
                break;
            case 'resigned':
                this.props.openCandidatesList(notification.get('to'));
                break;
            case 'sick_client':
                this.props.openHiredCandidatesList(notification.getIn(['to', 'id']))
                break;
            case 'remind_offer_send':
                this.props.openCandidatesList(notification.get('from'));
                break;
            case 'employee_approved_shift':
                this.props.getEmployerTimeReport(notification.getIn(['to', 'id']))
                break;
            case 'employer_auto_approved_shift':
                this.props.getEmployerTimeReport(notification.getIn(['to', 'id']))
                break;
            case 'employee_rejected_shift':
                this.props.getEmployerTimeReport(notification.getIn(['to', 'id']))
                break;
            case 'job_completed':
                this.props.getEmployerTimeReport(notification.getIn(['from', 'id']))
                break;
            case 'offer_accepted':
                this.props.openCandidateProfile(notification.getIn(['to', 'id']), notification.getIn(['from', 'id']));
                break;
            default:
                break;
        }
    }

    render() {
        const { notification } = this.props;
        const notificationText = notificationDescriptionMapper(notification);
        if (!notificationText) {
            return null;
        }

        const notificationWrapperClassNames = cx({
            'notification-wrap' : true,
            '-clickable': true,
            '-highlight' : _.includes(GOOD_NEWS_ACTIONTYPES, notification.get('actionType'))
        });

        return (
            <div className={notificationWrapperClassNames} onClick={this.handleClick}>
                {
                    !notification.get('read')
                    ?
                    <span className="-unread"></span>
                    :
                    null
                }
                <p className="-text">{notificationText}
                {
                    notification.get('actionType') == 'create_job'
                    ?
                    <a> Läs jobbeskrivning. </a>
                    :
                    null
                }
                {
                    notification.get('actionType') == 'job_recommended'
                    ?
                    <span>
                        <a> Läs jobbeskrivning. </a>
                        <a className='-tip'> Tips från Instajobs. </a>
                    </span>
                    :
                    null
                }
                </p>
                <p className="-date">
                    {moment.duration(moment(notification.get('createdAt')).diff(moment())).humanize()} sedan
                </p>
            </div>
        );
    }
}

export default NotificationsListItem;
