import React, { Component } from 'react';
import { connect } from 'react-redux';

import JobsList from '../views/JobsList.jsx';
import { fetchJobs } from '../actions/list.js';

const mapStateToProps = (state, ownProps) => {
    const { params } = ownProps.match;

    const jobsState = state.get('job');

    const data = jobsState.getIn(['byFilterType', params.type]);

    if (!data) {
        return {};
    }

    return {
        isFetching: data.get('isFetching'),
        jobs: data.get('jobs'),
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchJobs (filterType) {
            const { params } = props.match;
            dispatch(fetchJobs(params.type));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsList);
