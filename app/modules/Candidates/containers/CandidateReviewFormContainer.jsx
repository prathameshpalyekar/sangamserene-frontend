import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import ReviewForm from '../views/ReviewForm.jsx';

import { createReviewForJob, createReview, candidateProfile } from '../actions/list.js';

const mapStateToProps = (state, ownProps) => {
    return {
        candidate: state.getIn(['candidates', 'candidate']),
        isFetching: state.getIn(['candidates', 'isFetching']),
        submitReviewError: state.getIn(['candidates', 'submitReviewError']),
        submitReviewSuccess: state.getIn(['candidates', 'submitReviewSuccess']),
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        createReviewForJob (form, jobId, employeeId) {
            dispatch(createReviewForJob(form, jobId, employeeId));
        },
        createReview (form, employeeId) {
            dispatch(createReview(form, employeeId));
        },
        candidateProfile (candidateId) {
            dispatch(candidateProfile(candidateId));
        },
        goBack () {
            dispatch(goBack());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
