import React, { Component } from 'react';
import { connect } from 'react-redux';

import JobDetail from '../views/JobDetail.jsx';
import { fetchJob } from '../actions/fetch.js';

const mapStateToProps = (state, props) => {
    const { match: { params }} = props;

    const jobState = state.getIn(['job', 'jobs', params.id]);

    if (!jobState) {
        return {
            isFetching: true,
        };
    }

    return {
        isFetching: jobState.get('fetching'),
        fetchError: jobState.get('fetchError'),
        job: jobState.get('data'),
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchJob: () => {
            const { match: { params }} = props;

            dispatch(fetchJob(params.id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetail);
