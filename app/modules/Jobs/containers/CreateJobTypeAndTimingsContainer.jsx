import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { push } from 'react-router-redux';
import { reduxForm, formValueSelector } from 'redux-form/immutable'
import { change } from 'redux-form'

import JobTypeAndTimings from '../components/CreateJob/JobTypeAndTimings.jsx';
import prepareJobFormValuesForSubmit from '../helpers/prepareJobFormValuesForSubmit.js';
import { saveJob } from '../actions/save.js'
import { fetchHolidays } from 'modules/Holidays/actions/fetchHolidays.js';

const selector = formValueSelector('create-job');
const mapStateToProps = state => {
    const holidaysState = state.get('holidays');
    return {
        formValues: {
            serviceId: selector(state, 'serviceId'),
            service: selector(state, 'service'),
            type: selector(state, 'type'),
            dates: selector(state, 'dates'),
        },
        holidays: holidaysState.get('data'),
        lastUpdated: holidaysState.get('lastUpdated'),
        services: state.getIn(['services', 'data'])
    };
};

const mapDispatchsToProps = (dispatch, props) => {
    return {
        redirectToServiceSelection: () => {
            const { match: { url }} = props;

            // Strip of 'timings' section of url
            dispatch(push(url.substring(0, url.lastIndexOf('/'))));
        },
        fetchHolidays () {
            dispatch(fetchHolidays());
        },

        dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchsToProps)(reduxForm({
    form: 'create-job',
    destroyOnUnmount: false,
    // enableReinitialize : true,
    forceUnregisterOnUnmount: true,
    // keepDirtyOnReinitialize: true,
    onSubmit(values, dispatch, props, isDraft) {
        const { match: { url }} = props;

        if (isDraft) {
            return dispatch(saveJob(prepareJobFormValuesForSubmit(values.toJS())));
        }

        const baseUrl = url.substring(0, url.lastIndexOf('/'));

        dispatch(push(`${baseUrl}/details`));

        return false;
    },
    onSubmitSuccess (result, dispatch, props) {
        // const { submitSucceeded } = props;
        //
        // if (submitSucceeded && result !== false) {
        //     return dispatch(push('/dashboard/jobs/draft'));
        // }
    },
    validate (values, props) {
        const errors = {};
        const plainValues = values.toJS();

        if (!plainValues.dates || !plainValues.dates.length) {
            errors.dates = [{
                dt: 'Required',
                fromDate: 'Required',
                toDate: 'Required',
            }];
            return errors;
        }
        errors.dates = [];
        plainValues.dates.forEach((date, index) => {
            const error = {};

            if (Object.keys(date).length === 0) {
                errors.dates.push(undefined);
                return;
            }

            if (date && !date.fromDate) {
                error.fromDate = 'Required';
            }
            if (date && !date.toDate) {
                error.toDate = 'Required';
            }

            if (date && date.fromDate && date.toDate) {
                const fromDate = moment(date.fromDate);
                const toDate = moment(date.toDate);
                const now = moment();

                if (fromDate.isBefore(now)) {
                    error.fromDate = 'Job start date has passed.';
                }

                if (toDate.isBefore(fromDate)) {
                    error.toDate = 'Job end date is before job start date.';
                }

                // Break minutes validation not needed
                // const hours = toDate.diff(fromDate, 'hours');
                //
                // if (hours >= 5) {
                //     if (!date.breakMinutes) {
                //         error.breakMinutes = 'Required';
                //     }
                //
                //     if (date.breakMinutes < 15) {
                //         error.breakMinutes = 'Invalid';
                //     } else {
                //         if (hours >= 8 && date.breakMinutes < 60) {
                //             error.breakMinutes = 'Invalid';
                //         }
                //     }
                // }
            }

            errors.dates.push(Object.keys(error).length > 0 ? error : undefined);
        });

        if (plainValues.type === 'deadline') {
            if (!plainValues.numberOfHours || plainValues.numberOfHours < 1) {
                errors.numberOfHours = 'Required';
            }
        }

        return errors;
    },
})(JobTypeAndTimings));
