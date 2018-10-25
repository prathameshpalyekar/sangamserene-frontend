import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form/immutable'
import { change } from 'redux-form'

import EditPublishJob from '../components/CreateJob/EditPublishJob.jsx';
import prepareJobFormValuesForSubmit from '../helpers/prepareJobFormValuesForSubmit.js';
import { updatePublishJob } from '../actions/save.js'

const mapStateToProps = (state, props) => {
    const { match: { params }} = props;

    const jobState = state.getIn(['job', 'jobs', params.id])

    return {
        isSaving: jobState.get('saving'),
        saveError: jobState.get('saveError'),
    };
};

const mapDispatchsToProps = (dispatch, props) => {
    return {
        navigateBack () {
            const { history } = props;

            history.goBack();
        }
    };
};

export default connect(mapStateToProps, mapDispatchsToProps)(reduxForm({
    form: 'create-job',
    onSubmit (values, dispatch, props) {
        dispatch(updatePublishJob(prepareJobFormValuesForSubmit(values.toJS())));
        return true;
    },
    onSubmitSuccess (result, dispatch, props) {
        // const { submitSucceeded } = props;

        // FIXME: Move this to Component as this is incorrect
        // if (result) {
        //     return dispatch(push('/dashboard/jobs/open'));
        // }
    },
    validate (values, props) {
        const errors = {};

        if (!values.get('noOfPersons')) {
            errors.noOfPersons = 'Required';
        }

        return errors;
    },
})(EditPublishJob));
