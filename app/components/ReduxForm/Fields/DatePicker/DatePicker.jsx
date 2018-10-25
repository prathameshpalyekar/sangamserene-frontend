import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import cx from 'classnames';

import { DATE_LOCALE } from './constants.js';
import DayPickerNavbar from './DayPickerNavbar.js';

import './DatePickerCalendar.less';
import './DatePicker.less';

const DayPickerModifiers = {
    disabled: {
        before: new Date(),
    },
};

export default class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCalendar: false,
        };

        this.onDayClick = this.onDayClick.bind(this);
        this.hideMe = this.hideMe.bind(this);
        this.showCalendar = this.showCalendar.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.hideMe);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.hideMe);
    }

    hideMe (e) {
        const area = this ? ReactDOM.findDOMNode(this) : null;
        if (area && !area.contains(e.target)) {
            this.setState({
                showCalendar: false,
            });
        }
        return false;
    }

    showCalendar () {
        this.setState({
            showCalendar: true,
        });
    }

    hideCalendar () {
        this.setState({
            showCalendar: false,
        });
    }

    onDayClick(day, {selected, disabled}) {
        const { input: { value, onChange } } = this.props;

        if (disabled) {
            return false;
        }

        if (day) {
            onChange(day);
            this.hideCalendar();
            return true;
        }

        return false;
    }

    renderCalendar () {
        const { input: { value  } } = this.props;

        return (
            <div className="datepicker-calendar">
                <DayPicker localeUtils={DATE_LOCALE}
                    navbarElement={<DayPickerNavbar />}
                    enableOutsideDays
                    showOutsideDays
                    selectedDays={value || undefined}
                    modifiers={DayPickerModifiers}
                    onDayClick={this.onDayClick}/>
            </div>
        );
    }

    renderLabel () {
        const { input: { value  }, placeholder, meta } = this.props;

        const visibleDate = !value ? placeholder : moment(value).format('ddd, MMM D, YYYY');

        const showErrorClass = (meta.touched || meta.submitFailed) && meta.error;

        const calendarLabelClassNames = cx('datepicker-label', {
            '-selected': value && !showErrorClass,
            '-error': showErrorClass,
        });

        return (
            <span className={calendarLabelClassNames} onClick={this.showCalendar}>{visibleDate}</span>
        );
    }

    render() {
        const { showCalendar } = this.state;

        return (
            <div className="datepicker">
                {this.renderLabel()}
                {showCalendar ? this.renderCalendar() : null }
            </div>
        );
    }
}
