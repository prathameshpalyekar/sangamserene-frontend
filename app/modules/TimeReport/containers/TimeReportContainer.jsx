import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import TimeReport from '../views/TimeReport.jsx';

import { fetchTimeReport } from '../actions/timereport.js';

const mapStateToProps = (state, props) => {
    const { match: { params }} = props;

    const stateProp = {};

    const timeReportState = state.getIn(['timereport', 'jobs', params.id || 'new']) || Immutable.fromJS({
        fetching: false,
    });

    stateProp.isFetching = timeReportState.get('fetching');
    stateProp.fetchError = timeReportState.get('fetchError');
    stateProp.timereport = timeReportState.get('timereport');

    return stateProp;
};

const mapDispatchsToProps = (dispatch, props) => {
    return {
        fetchTimeReport () {
            const { match: { params }} = props;

            if (params.id) {
                dispatch(fetchTimeReport(params.id));
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchsToProps)(TimeReport);
