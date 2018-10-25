import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import JobListItem from '../components/JobListItem.jsx';

import { openCandidatesList } from '../../Candidates/actions/list.js';
import { cancelJob } from '../actions/cancel.js';

const mapStateToProps = (state, ownProps) => {

    return {
        job: ownProps.job,
        cancelState: state.getIn(['job', 'cancelJob', ownProps.job.id]),
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openCandidatesList () {
            const { job } = ownProps;
            dispatch(openCandidatesList(job))
        },
        editJob () {
            const { job } = ownProps;

            if (job.status === 'draft') {
                dispatch(push(`/dashboard/jobs/${job.id}/edit`));
                return false;
            }

            dispatch(push(`/dashboard/jobs/${job.id}/edit`));
            return false;
        },
        openTimeReport () {
            const { job } = ownProps;
            dispatch(push(`/dashboard/jobs/${job.id}/time-report`));
            return false;
        },
        openJobDetails () {
            const { job } = ownProps;

            dispatch(push(`/dashboard/jobs/${job.id}`));
            return false;
        },
        cancelJob () {
            const { job } = ownProps;

            dispatch(cancelJob(job.id));
            return false;
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobListItem);
