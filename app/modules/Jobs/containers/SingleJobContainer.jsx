import React, { Component } from 'react';
import { connect } from 'react-redux';

import SingleJob from '../components/SingleJob.jsx';
import { fetchServices } from '../../Service/actions/apiActions.js';

const mapStateToProps = (state, ownProps) => {
    const services = state.getIn(['services', 'data']);

    return {
        services,
        user: state.getIn(['auth', 'user'])
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchServices: () => {
           dispatch(fetchServices());
        },
        fetchJobs (filterType) {
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleJob);
