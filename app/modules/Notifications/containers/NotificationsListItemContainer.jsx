import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import NotificationsListItem from '../components/NotificationsListItem.jsx';

import { markAsRead } from '../actions/notifications.js';
import { fetchCandidatesListForNotifications } from '../../Candidates/actions/list.js';

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        markAsRead (notification) {
            dispatch(markAsRead(notification));
        },
        getEmployerTimeReport (jobId) {
            dispatch(push(`/dashboard/jobs/${jobId}/time-report`));
        },
        openCandidatesList (job) {
            dispatch(push(`/dashboard/job/${job.get('id')}/candidates/applied`));
        },
        openHiredCandidatesList (jobId) {
            dispatch(push(`/dashboard/job/${jobId}/candidates/hired`));
        },
        getJobDetails (jobId) {
            dispatch(push(`/dashboard/jobs/${jobId}`));
        },
        openCandidateProfile (jobId, employeeId) {
            dispatch(fetchCandidatesListForNotifications(jobId, employeeId));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsListItem);
