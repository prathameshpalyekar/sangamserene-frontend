import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Field, FieldArray } from 'redux-form/immutable'
import { change, arraySplice } from 'redux-form'
import TagManager from 'react-gtm-module';
import moment from 'moment';
import _ from 'lodash';

import { RadioButtonGroup } from 'components/ReduxForm/Fields/'
import Whiteboard from 'components/ui/Whiteboard';

// import NormalJobTimingsContainer from '../../containers/NormalJobTimingsContainer.jsx';
import DeadlineJobTimings from './JobTimings/DeadlineJobTimings.jsx';
import NormalJobTimings from './JobTimings/NormalJobTimings.jsx';
import Config from '../../../../config';

import { JOB_TYPE_OPTIONS } from '../../constants.js';

import UncomfortableHoursHelper from 'modules/Holidays/helpers/UncomfortableHoursHelper.js';
const HOLIDAYS_CACHE_TIMEOUT_HOURS = 24;

const gtmArgs = {
    dataLayer: {
        event: 'save_as_draft',
        label: 'Spara som utkast'
    },
    dataLayerName: 'PageEvents'
}

class JobTypeAndTimings extends Component {

    constructor(props) {
        super(props);

        this.saveAsDraft = this.saveAsDraft.bind(this);
        this.resetFields = this.resetFields.bind(this);
    }

    componentDidMount () {
        const { formValues: { serviceId }, redirectToServiceSelection } = this.props;

        if (!serviceId) {
            redirectToServiceSelection();
        }
    }

    componentWillMount () {
        this.fetchHolidays();
    }

    resetFields (event, newValue) {
        const { dispatch } = this.props;

        // Considerably high end number to delete all items from array.
        // Without 4th argument, arraySplice function seems to not be working.
        // This is unlike Array.splice
        dispatch(arraySplice('create-job', 'dates', 1, 10000));
    }

    saveAsDraft () {
        const { handleSubmit, onSubmit, dispatch } = this.props;

        TagManager.dataLayer(gtmArgs);

        dispatch(change('create-job', 'status', 'draft'));
        // Handle submit is not availble in mapDispatchsToProps, hence it is here
        handleSubmit(values => {
            return onSubmit(values.set('status', 'draft'), dispatch, this.props, true);
        })();
    }

    isUncomfortableHours (dates) {
        if (dates === undefined) {
            return false;
        }
        const { formValues: { serviceId }, services, holidays } = this.props;
        const service = _.find(services, 'id', serviceId);

        dates = dates && dates.toJS();
        return ((dates || []).map((date, key) => {
            if (!date || !date.fromDate || !date.toDate) {
                return false;
            }
            return UncomfortableHoursHelper.isUncomfortableHours(date.fromDate, date.toDate, service, holidays.toJS());
        })).some(dateVal => true === dateVal);
    }

    fetchHolidays () {
        const { holidays, holidaysLastUpdated } = this.props;
        const now = moment();
        if (!(holidays && holidays.size) || !holidaysLastUpdated || now.diff(moment(holidaysLastUpdated), 'hours') >= HOLIDAYS_CACHE_TIMEOUT_HOURS) {
            this.props.fetchHolidays();
        }
    }

    render () {
        const { formValues: { type, dates }, handleSubmit, submitting } = this.props;

        const showUncomfortableHoursNote = this.isUncomfortableHours(dates) && type === 'normal';

        return (
            <div>
                <Whiteboard.Title>Typ Av Jobb</Whiteboard.Title>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="create-job-section">
                        <Field name="type" component={RadioButtonGroup} label="Välj vilken typ jobbet har" options={JOB_TYPE_OPTIONS} btnLayout="inline" onChange={this.resetFields}/>
                    </div>
                    {type === 'normal'
                        ? <FieldArray name="dates" component={NormalJobTimings} />
                        : <DeadlineJobTimings />
                    }
                    <Whiteboard.Stubs separatorTop={type === 'normal'}>
                        <div className="create-job-section">
                            <div className="row">
                                <div className="col-md-6 col-md-offset-3">
                                    <p><button type="submit" className="btn btn-primary btn-filled btn-block" disabled={submitting}>Nästa</button></p>
                                    <p>
                                        <Link to={`/dashboard/jobs/create/copy-job`} className="btn btn-primary btn-block">Skapa kopia på tidigare jobb</Link>
                                    </p>
                                </div>
                            </div>
                            {
                                showUncomfortableHoursNote ?
                                    <p className="-uncomfortable-note text-center">Ditt jobb ligger på en tid för OB. Läs mer om hur priserna påverkas <a target="_blank" href="https://intercom.help/instajobs/for-foretag-och-kunder/fakturering/vad-ar-ob">här</a>.</p>
                                    : null
                            }
                        </div>
                    </Whiteboard.Stubs>
                </form>
            </div>
        );
    }
}

export default JobTypeAndTimings;
