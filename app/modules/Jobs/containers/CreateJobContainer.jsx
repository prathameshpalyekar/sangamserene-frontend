import React, { Component } from 'react';
import Immutable from 'immutable';
import moment from 'moment';
import { connect } from 'react-redux';
import { destroy, initialize } from 'redux-form'
import { push } from 'react-router-redux';

import CreateJob from '../views/CreateJob.jsx';
import { fetchJob } from '../actions/fetch.js';

import { DEFAULT_VALUES, VALID_FORM_FIELDS, VALID_PUBLISHED_FORM_FIELDS } from '../components/CreateJob/constants.js';

const mapStateToProps = (state, props) => {
    const { match: { params }} = props;

    const jobState = state.getIn(['job', 'jobs', params.id || 'new']) || Immutable.fromJS({
        fetching: false,
    });

    const copyJobState = state.getIn(['job', 'jobs', params.copyId]);

    const stateProp = {};
    stateProp.isFetching = jobState.get('fetching');
    stateProp.fetchError = jobState.get('fetchError');
    stateProp.job = jobState.get('data');
    stateProp.isSaving = jobState.get('saving');
    stateProp.saveError = jobState.get('saveError');
    stateProp.copyJob = copyJobState ? copyJobState.get('data'): null;
    stateProp.copyJobIsFetching = copyJobState ? copyJobState.get('fetching'): null;

    return stateProp;
};

const mapDispatchsToProps = (dispatch, props) => {
    return {
        fetchJob (jobId) {
            const { match: { params }} = props;

            if (jobId || (params.id || params.copyId)) {
                dispatch(fetchJob(jobId ||  (params.id || params.copyId)));
            }
        },
        resetForm () {
            dispatch(destroy('create-job'));
        },
        initializeForm (values) {

            if (values) {
                const filterFields = values.get('status') !== 'draft' ? VALID_PUBLISHED_FORM_FIELDS : VALID_FORM_FIELDS;

                values = values.set('status', 'publish') // Setting status to publish for default submit
                    // Fix date items formatting
                    .set('dates', (values.get('dates') || []).map(d => {
                        return Object.assign({}, d.toJS(), {
                            fromDate: moment(d.get('fromDate')).toDate(),
                            toDate: moment(d.get('toDate')).toDate(),
                        });
                    }))
                    // Stripping unwanted form fields
                    .filter((value, key) => {
                        return filterFields.indexOf(key) !== -1;
                    });
            }

            dispatch(initialize('create-job', values || Immutable.fromJS(DEFAULT_VALUES), {
                updateUnregisteredFields: true,
            }));
        },
        navigateBack (job) {
            if (job.status === 'draft') {
                return dispatch(push('/dashboard/jobs/draft'));
            } else {
                return dispatch(push('/dashboard/jobs/open'));
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchsToProps)(CreateJob);
