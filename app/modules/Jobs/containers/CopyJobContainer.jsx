import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import CopyJob from '../components/CreateJob/CopyJob.jsx';

import { jobsWithoutCancel } from '../actions/copyJob.js';

const mapStateToProps = (state, props) => {

    const jobState = state.get('job');
    const data = jobState.getIn(['byFilterType', 'withoutCancel']);

    if (!data) {
        return {};
    }

    return {
        errorMessage: data.get('errorMessage'),
        isFetching: data.get('isFetching'),
        jobsList: jobState.get('jobsWithoutCancel')
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        jobsWithoutCancel: () => {
            dispatch(jobsWithoutCancel());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyJob);
