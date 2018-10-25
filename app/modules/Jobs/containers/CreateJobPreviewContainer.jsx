import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { formValues, formValueSelector, reduxForm } from 'redux-form/immutable'

import Preview from '../components/CreateJob/Preview.jsx';
import { VALID_FORM_FIELDS } from '../components/CreateJob/constants.js';

const selector = formValueSelector('create-job');

const mapStateToProps = state => {

    const formValues = selector(state, ...VALID_FORM_FIELDS);

    const user = state.getIn(['auth', 'user']);

    const services = state.getIn(['services', 'data']);

    const job = Object.assign({}, formValues, {
        companyName: user.getIn(['employerInfo', 'companyName']),
        companyLogo: user.get('profilePic'),
        service: services.find(s => s.id === formValues.serviceId),
    });

    return {
        job,
    };
};

const mapDispatchsToProps = (dispatch, props) => {
    return {
        redirectToServiceSelection: () => {
            const { match: { url }} = props;

            dispatch(push(url.substring(0, url.lastIndexOf('/'))));
        }
    };
};

export default connect(mapStateToProps, mapDispatchsToProps)(Preview);
