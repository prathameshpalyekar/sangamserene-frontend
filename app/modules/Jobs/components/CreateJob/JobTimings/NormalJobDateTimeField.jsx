import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import moment from 'moment';
import { Field } from 'redux-form/immutable'
import { change, unregisterField } from 'redux-form'

import Whiteboard from 'components/ui/Whiteboard';
import Label from 'components/ReduxForm/Label.jsx';
import { DatePicker, TimePicker, Numeric, Input } from 'components/ReduxForm/Fields';

import './TimerBox.less';

class NormalJobDateTimeField extends Component {
    constructor(props) {
        super(props);

        this.onFromDateChange = this.onFromDateChange.bind(this);
        this.onFromTimeChange = this.onFromTimeChange.bind(this);
        this.onToTimeChange = this.onToTimeChange.bind(this);
        this.onBreakMinutesChange = this.onBreakMinutesChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    getBreakMinutes (date) {
        if (!date || !date.fromDate || !date.toDate) {
            return false;
        }

        const toDate = moment.isMoment(date.toDate) ? date.toDate : moment(date.toDate);
        const fromDate = moment.isMoment(date.fromDate) ? date.fromDate : moment(date.fromDate);
        const hours = toDate.diff(fromDate, 'hours');

        if (hours >= 8) {
            return 60;
        }
        if (hours >= 5) {
            return 15;
        }

        return false;
    }

    setTimeForDate (dt, time) {
        if (Object.prototype.toString.call(dt) === '[object Date]') {
            dt = moment(dt);
        }

        if (Object.prototype.toString.call(time) === '[object Date]') {
            time = moment(time);
        }

        dt.hour(time.hours());
        dt.minute(time.minutes());
        dt.second(0);

        return dt.toDate();
    }

    onFromTimeChange (fromTime) {
        const { input: { value, onChange }} = this.props;

        const newDateObj = Object.assign({}, value, {
            fromDate: this.setTimeForDate(value.fromDate || fromTime, fromTime),
        });

        this.setBreakMinutes(newDateObj);

        onChange(newDateObj);

    }

    onToTimeChange (toTime) {
        const { input: { value, onChange }} = this.props;

        const newDateObj = Object.assign({}, value, {
            toDate: this.setTimeForDate(value.toDate || value.fromDate || toTime, toTime),
        });

        this.setBreakMinutes(newDateObj);

        onChange(newDateObj);
    }

    onFromDateChange (fromDate) {
        const { input: { value, onChange }} = this.props;

        const newDateObj = Object.assign({}, value, {
            fromDate: this.setTimeForDate(fromDate, value.fromDate || fromDate),
            toDate: this.setTimeForDate(fromDate, value.toDate || fromDate),
        });

        this.setBreakMinutes(newDateObj);

        onChange(newDateObj);
    }

    onBreakMinutesChange (event) {
        const breakMinutes = event.target.value;

        const { input: { value, onChange }} = this.props;

        const newDateObj = Object.assign({}, value, {
            breakMinutes: parseInt(breakMinutes, 10),
        });

        onChange(newDateObj);
    }

    onRemove (event) {
        event.preventDefault();

        const { onRemove, index } = this.props;

        onRemove(index);

        return false;
    }

    // Mutates the original object
    setBreakMinutes (dateObj) {
        if (dateObj.fromDate && dateObj.toDate) {
            const breakMinutes = this.getBreakMinutes(dateObj);

            if (breakMinutes === false) {
                delete dateObj.breakMinutes;
            } else if (!dateObj.breakMinutes || dateObj.breakMinutes < breakMinutes) {
                dateObj.breakMinutes = breakMinutes;
            }
        } else {
            delete dateObj.breakMinutes;
        }

        return dateObj;
    }

    render () {
        const { totalDates, index, input: { value }, meta } = this.props;
        const passText = index > 0 ? ` (PASS ${index + 1})` : '';

        const dateNote = value.breakMinutes && value.breakMinutes >= 5
            ? 'Eftersom ditt jobb är längre än 5 timmar kanske du har tänkt att personen ska ta rast. Det kan vara bra att vara tydlig med det så att det inte glöms bort i tidrapporteringen.'
            : 'Har du ett jobb som tar flera dagar? Fyll i uppgifterna för det första passet här och klicka sedan på ”Lägg till ett pass” för att addera ytterligare pass. Du kan som max lägga till 5 pass per jobb.';

        const baseDate = value ? value.fromDate : undefined;

        // Error display here needs to be fixed, it is bit buggy
        const datePickerProps = {
            input: {
                value: value.fromDate,
                onChange: this.onFromDateChange,
            },
            meta,
        };

        const fromTimePickerProps = {
            input: {
                value: value.fromDate,
                onChange: this.onFromTimeChange,
            },
            meta,
        };

        const toTimePickerProps = {
            input: {
                value: value.toDate,
                onChange: this.onToTimeChange,
            },
            meta,
        };

        const breakMinutesProps = {
            input: {
                value: value.breakMinutes,
                onChange: this.onBreakMinutesChange,
            },
            meta: {}, // At this point, we intentionally don't want any error for this field, a quick fix
        };

        return (
            <Whiteboard.Stubs separatorTop={index !== 0} noTopPadding={index === 0}>
                <div className="create-job-section">
                    <Whiteboard.SubTitle>Datum och tid{passText}</Whiteboard.SubTitle>
                    <Label>När vill du att jobbet ska utföras?</Label>
                    <div className="timerbox">
                        <div className="timerbox-date">
                            <label className="-label">Datum</label>
                            <DatePicker {...datePickerProps} placeholder="Välj" />
                        </div>
                        <div className="timerbox-time">
                            <label className="-label">Tid</label>
                            <div>
                                <TimePicker {...fromTimePickerProps} placeholder="..." />
                                <span className="-sep">-</span>
                                <TimePicker {...toTimePickerProps} placeholder="..." />
                            </div>
                        </div>
                    </div>
                    {typeof value.breakMinutes !== 'undefined' && value.breakMinutes !== false
                            ? <Input type="number" {...breakMinutesProps } min={5} step={5}/>
                            : null
                    }
                    {index === 0
                            ?
                            <div className="well well-sm well-note text-center">
                                <p>{dateNote}</p>
                            </div>
                            : null
                    }
                    {totalDates !== 1
                            ? <div className="-date-remove-btn">
                                <a href="#" className="text-danger" onClick={this.onRemove}>Ta bort</a>
                            </div>
                            : null
                    }
                </div>
            </Whiteboard.Stubs>
        );
    }
}

export default connect(() => {
    return {};
}, (dispatch) => {
    return { dispatch };
})(NormalJobDateTimeField);
