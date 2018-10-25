import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Immutable from 'immutable';
import { reduxForm, formValueSelector } from 'redux-form/immutable'

import ServicePicker from '../components/CreateJob/ServicePicker.jsx';
import { fetchServices } from '../../Service/actions/apiActions.js';

const selector = formValueSelector('create-job');

const mapStateToProps = (state, props) => {
    const { match: { params }} = props;

    const services = state.getIn(['services', 'data']);

    return {
        services,
    };
};

const mapDispatchsToProps = dispatch => {
    return {
        fetchServices: () => {
           dispatch(fetchServices());
        }
    };
};

export default connect(mapStateToProps, mapDispatchsToProps)(reduxForm({
    form: 'create-job',
    // enableReinitialize : true,
    // keepDirtyOnReinitialize: true,
    // fields: VALID_FORM_FIELDS,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit(values, dispatch, props) {
        const { match: { url }} = props;

        dispatch(push(`${url}/timings`));
    },
    validate (values, props) {
        const errors = {};

        if (!values.get('service')) {
            errors.service = 'Required';
        }

        return errors;
    },
})(ServicePicker));
