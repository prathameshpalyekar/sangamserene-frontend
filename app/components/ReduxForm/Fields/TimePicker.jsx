import React, { Component } from 'react';
import moment from 'moment';
import cx from 'classnames';
import RcTimePicker from 'rc-time-picker';

import './TimePicker.less';

export default class TimePicker extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    // componentWillReceiveProps (newProps) {
    //     if (newProps.baseDate !== this.props.baseDate) {
    //     }
    //     // TODO
    //     // Code to update date when baseDate prop changes
    // }

    // Repeated function same as in AdvanceOptions.jsx
    // @FIXME
    setTimeForDate (dt, time) {
        dt.hour(time.hours());
        dt.minute(time.minutes());
        dt.second(0);

        return dt;
    }

    onChange (value) {
        const { baseDate, input: { onChange } } = this.props;

        if (baseDate) {
            onChange(this.setTimeForDate(moment(baseDate), value));
        } else {
            onChange(value);
        }
    }

    render() {
        const { defaultValue, placeholder, input: { value, onBlur, onFocus }, meta } = this.props;

        const className = cx({
            // '-error': meta.touched && meta.invalid && (!meta.pristine || meta.submitFailed),
            '-error': (meta.touched || meta.submitFailed) && meta.error,
        });

        const fieldValue = value 
            ? value.isValid && value.isValid() ? value : moment(value)
            : undefined;

        return (
            <RcTimePicker
                className={className}
                showSecond={false}
                defaultValue={defaultValue}
                value={fieldValue}
                placeholder={placeholder || '...'}
                onChange={this.onChange}
            />
        )
    }
}
