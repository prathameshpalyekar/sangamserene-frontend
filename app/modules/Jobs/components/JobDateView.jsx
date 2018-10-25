import React, { Component } from 'react';
import moment from 'moment';

import '../less/JobDateView.less';

class JobDateView extends Component {

    formatDate(date, format) {
        return date ? date.format(format) : null;
    }

    render() {
        const { job } = this.props;
        const { dates, type, numberOfHours } = job;

        const jobStartDate = job.jobStartDate ? moment(job.jobStartDate) : null;
        const jobEndDate = job.jobEndDate ? moment(job.jobEndDate) : null;
        const jobStartDateFormatted = this.formatDate ( jobStartDate, 'MMM Do, YYYY');
        const jobEndDateFormatted = this.formatDate ( jobEndDate, 'MMM Do, YYYY');

        return (
            <div className="job-date-view">
                {
                    jobStartDateFormatted === jobEndDateFormatted
                    ?
                    <p className="date"> {jobStartDateFormatted}</p>
                    :
                    <p className="date"> {jobStartDateFormatted} - {jobEndDateFormatted}</p>
                }
                {
                    type === 'deadline'
                    ?
                    <p className="job-time-detail">Totalt {numberOfHours}h</p>
                    :
                    <div>
                        <p className="time"> { this.formatDate(jobStartDate, 'HH:mm') } - { this.formatDate(jobEndDate, 'HH:mm') }</p>
                        <p className="job-time-detail">Totalt {(dates || []).length} pass</p>
                    </div>
                }
            </div>
        );

    }
}

export default JobDateView;
