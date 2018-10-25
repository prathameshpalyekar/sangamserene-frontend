import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import { DatePicker } from 'components/ReduxForm/Fields';
import Label from 'components/ReduxForm/Label.jsx';

class DeadlineJobDateField extends Component {

    constructor(props) {
        super(props);

        this.onFromDateChange = this.onFromDateChange.bind(this);
        this.onToDateChange = this.onToDateChange.bind(this);
    }

    onFromDateChange (fromDate) {
        const { input: { value, onChange }} = this.props;

        const newDateObj = Object.assign({}, value, {
            fromDate: moment(fromDate).startOf('day').toDate(),
        });

        onChange(newDateObj);
    }

    onToDateChange (toDate) {
        const { input: { value, onChange }} = this.props;

        const newDateObj = Object.assign({}, value, {
            toDate: moment(toDate).endOf('day').toDate(),
        });

        onChange(newDateObj);
    }

    render () {
        const { index, input: { value }, meta } = this.props;

        // Error display here needs to be fixed, it is bit buggy
        const fromDatePickerProps = {
            input: {
                value: value.fromDate,
                onChange: this.onFromDateChange,
            },
            meta,
        };

        const toDatePickerProps = {
            input: {
                value: value.toDate,
                onChange: this.onToDateChange,
            },
            meta,
        };

        return (
            <div>
                <Label>Välj startdatum och deadline för jobbet</Label>
                <div className="timerbox">
                    <div className="timerbox-date">
                        <label className="-label">Startdatum</label>
                        <DatePicker {...fromDatePickerProps} placeholder="Välj" />
                    </div>
                    <div className="timerbox-date">
                        <label className="-label">Deadline</label>
                        <DatePicker {...toDatePickerProps} placeholder="Välj" />
                    </div>
                </div>
            </div>
        );
    }
}

export default DeadlineJobDateField;
