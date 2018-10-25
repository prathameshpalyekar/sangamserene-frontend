import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { formValueSelector, reduxForm } from 'redux-form/immutable'
import { change } from 'redux-form'
import TagManager from 'react-gtm-module';

import DetailsForm from '../components/CreateJob/DetailsForm.jsx';
import prepareJobFormValuesForSubmit from '../helpers/prepareJobFormValuesForSubmit.js';
import { saveJob } from '../actions/save.js'
import Config from '../../../config';

const selector = formValueSelector('create-job');
const mapStateToProps = state => {

    const serviceId = selector(state, 'serviceId');

    const services = state.getIn(['services', 'data']);

    return {
        selectedService: services.find(s => s.id === serviceId),
        formValues: {
            serviceId,
            type: selector(state, 'type'),
            hourlySalary: selector(state, 'hourlySalary'),
        },
    };
};

const mapDispatchsToProps = (dispatch, props) => {
    return {
        redirectToServiceSelection () {
            const { match: { url }} = props;

            // Strip of 'timings' section of url
            dispatch(push(url.substring(0, url.lastIndexOf('/'))));
        },
        showJobPreview () {
            dispatch(push('/dashboard/jobs/create/preview'));
            return false;
        },
        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchsToProps)(reduxForm({
    form: 'create-job',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit(values, dispatch, props, isDraft) {
        if (! isDraft) {
            const eventType = isDraft ? 'save_as_draft' : 'publish_job';
            const eventLabel = isDraft ? 'Spara som utkast' : 'Spara och publicera';
            const gtmArgs = {
                dataLayer: {
                    event: eventType,
                    label: eventLabel
                },
                dataLayerName: 'PageEvents'
            }
            TagManager.dataLayer(gtmArgs);
        }

        dispatch(saveJob(prepareJobFormValuesForSubmit(values.toJS())));
        return isDraft;
    },
    onSubmitSuccess (result, dispatch, props) {
        // const { submitSucceeded } = props;

        // if (submitSucceeded && result !== false) {
        //     return dispatch(push('/dashboard/jobs/draft'));
        // }
        //
        // return dispatch(push('/dashboard/jobs/open'));
    },
    validate (values, props) {
        const errors = {};

        if (!values.get('serviceId')) {
            errors.serviceId = 'Required';
        }

        return errors;
    },
})(DetailsForm));
