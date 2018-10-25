import React, { Component } from 'react';
import moment from 'moment';

import '../less/JobDate.less';

class JobDate extends Component {

    formatDate(date, format){
        return date ? date.format(format) : null;
    }

    render() {
        const { job , hideInfo } = this.props;
        const { dates, type, numberOfHours } = job;

        const jobStartDate = job.jobStartDate ? moment(job.jobStartDate) : null;
        const jobEndDate = job.jobEndDate ? moment(job.jobEndDate) : null;
        const jobStartDateFormatted = this.formatDate ( jobStartDate, 'MMM Do, YYYY');
        const jobEndDateFormatted = this.formatDate ( jobEndDate, 'MMM Do, YYYY');

        return (
            <div className="">
                <div className="job-head-date-time-wrap">
                {
                    jobStartDateFormatted === jobEndDateFormatted
                    ?
                    <span className="date"> {jobStartDateFormatted}</span>
                    :
                    <span className="date"> {jobStartDateFormatted} - {jobEndDateFormatted}</span>
                }
                {
                    type === 'deadline'
                    ?
                    (
                        hideInfo
                        ?
                        null
                        :
                        <span className="job-time-detail"> (Totalt {numberOfHours}h)</span>
                    )
                    :
                    <span className="time"> { this.formatDate(jobStartDate, 'HH:mm') } - { this.formatDate(jobEndDate, 'HH:mm') }
                        {
                            hideInfo
                            ?
                            null
                            :
                            ` (Totalt ${(dates || []).length} pass)`
                        }
                    </span>
                }
                </div>
            </div>
        );
    }
}

export default JobDate;
