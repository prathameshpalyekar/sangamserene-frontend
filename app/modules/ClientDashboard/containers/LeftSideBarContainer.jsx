import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LeftSideBar from '../views/LeftSideBar.jsx';
import { fetchJobs } from '../../Jobs/actions/list.js';

const mapStateToProps = state => {
    return {
        jobCounts: state.getIn(['job', 'counts']),
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchJobs (filterType) {
            dispatch(fetchJobs(filterType));
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftSideBar));
