import moment from 'moment'

module.exports = {
    getJobNameAndDate: function(job) {
        return `${getServiceName(job)}, ${getDateFormatted(job)}`;
    },
    getJobDateTime: function(job) {
        return getDateTimeFormatted(job);
    },
    getJobServiceName: function(job) {
        return getServiceName(job);
    },
    getJobTypeDescription: function(job) {
        const { type, numberOfHours } = job;
        if (type === 'normal') {
            return job.dates ? `(${job.dates.length} pass)` : '(0 pass)';
        }
        return `(${numberOfHours}h)`;
    }
}

function formatDate(date, format) {
    return date ? date.format(format) : null;
}

function getServiceName(job) {
    return job.service.name;
}

function getDateTimeFormatted(job) {
    const jobStartDate = job.jobStartDate ? moment(job.jobStartDate) : null;
    const jobEndDate = job.jobEndDate ? moment(job.jobEndDate) : null;
    const jobStartDateFormatted = formatDate(jobStartDate, 'MMM Do');
    const jobEndDateFormatted = formatDate(jobEndDate, 'MMM Do');
    let res = jobStartDateFormatted;
    if (jobStartDateFormatted !== jobEndDateFormatted) {
        res = `${res} - ${jobEndDateFormatted}`;
    }
    if (job.type === 'normal') {
        res = `${res} ${formatDate(jobStartDate, 'HH:mm')} - ${formatDate(jobEndDate, 'HH:mm')}`;
    }
    return res;
}

function getDateFormatted(job) {
    const jobStartDate = job.jobStartDate ? moment(job.jobStartDate) : null;
    const jobStartDateFormatted = formatDate(jobStartDate, 'Do MMM YYYY');
    return jobStartDateFormatted;
}
