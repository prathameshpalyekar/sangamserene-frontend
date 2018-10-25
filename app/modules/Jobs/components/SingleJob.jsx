import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Field } from 'redux-form/immutable'
import nl2br from 'react-nl2br';
import cx from 'classnames';
import moment from 'moment';

import Whiteboard from 'components/ui/Whiteboard';
import AwImageCaption from 'components/ui/AwImageCaption';
import Loader from 'components/Loader';

import '../less/SingleJob.less';

import DETAIL_ROWS from './SingleJob/DetailRows.js';

class SingleJob extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { services, fetchServices } = this.props;

        if (!services || !services.length) {
            fetchServices();
        }
    }

    getJob () {
        const { job } = this.props;

        if (job && job.toJS) {
            return job.toJS();
        }

        return job;
    }

    getService () {
        const { services } = this.props;

        const job = this.getJob();

        const serviceId = job.serviceId;

        return (services || []).find(s => s.id === serviceId);
    }

    formatDate(date) {
        const invalidDate = <span className="text-muted">-</span>;

        if (!date) {
            return invalidDate;
        }

        const momentDate = moment(date)

        if (!momentDate) {
            return invalidDate;
        }

        return (
            <span>
                {momentDate.format('ddd, ')}
                <strong>{momentDate.format('MMM Do ')}</strong>
                {momentDate.format('YYYY')}
            </span>
        )
    }

    renderParentJobMessage () {
        const job = this.getJob();

        if (!job.parentId) {
            return null;
        }

        return (
            <Whiteboard.Stubs separatorTop={true}>
                <section className="create-job-section">
                    <p className="text-center">
                        Det här jobbet berör {job.dates.length} av totalt {job.parentJob.dates.length} pass. De aktuella passen har återpublicerats på grund av sjukanmälan.
                    </p>
                </section>
            </Whiteboard.Stubs>
        );
    }

    renderDetailsRow (index, label, value) {
        const valueClassName = cx('-value', {
            'text-muted': !value,
        });

        return (
            <tr key={index}>
                <td className="-label">{label}</td>
                <td className={valueClassName}>{value ? value : '-'}</td>
            </tr>
        );
    }

    renderDateRows () {
        const job = this.getJob();

        const { type, dates, jobStartDate, jobEndDate } = job;

        if (type === 'deadline') {
            const date = dates ? (dates.get && dates.get(0)) || dates[0] : {};

            const startDate = jobStartDate || date.fromDate;
            const endDate = jobEndDate || date.toDate;

            return (
                <table className="table -dates-table">
                    <tbody>
                        <tr>
                            <td className="-label">Startdatum</td>
                            <td className="-value">{this.formatDate(startDate)}</td>
                        </tr>
                        <tr>
                            <td className="-label">Deadline</td>
                            <td className="-value">{this.formatDate(endDate)}</td>
                        </tr>
                    </tbody>
                </table>
            );
        }

        return (
            <table className="table -dates-table">
                <thead>
                    <tr>
                        <th>Arbetsdagar</th>
                        <th>Timmar</th>
                    </tr>
                </thead>
                <tbody>
                    {(dates || []).map((date, index) => {
                        return (
                            <tr key={index}>
                                <td className="-label">{this.formatDate(date.fromDate)}</td>
                                <td className="-value -timings">{date.fromDate ? moment(date.fromDate).format('HH:mm') : ''} – {date.toDate ? moment(date.toDate).format('HH:mm') : '' }</td>
                                <td className="-meta">{date.breakMinutes ? `Rast ${date.breakMinutes} min` : ''}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }

    renderDetails () {
        const job = this.getJob();

        return (
            <table className="table single-job-details-table">
                <tbody>
                    <tr>
                        <td colSpan="2" className="-dates">
                            {this.renderDateRows()}
                        </td>
                    </tr>
                    {DETAIL_ROWS.map((r, index) => {
                        const value = r.key ? job[r.key] : r.getValue && r.getValue(job, this.props);
                        return this.renderDetailsRow(index, r.label || r.getLabel(job), value);
                    })}
                </tbody>
            </table>
        );
    }

    getEmployerCompletedMonths(employer) {
        const regDate = employer.registeredAt ? moment(employer.registeredAt) : moment(employer.createdAt);
        const now = moment();
        return now.diff(regDate, 'months') + ' mån';
    }

    render () {
        const { user } = this.props;
        const job = this.getJob();

        if (!job) {
            return <Loader />
        }

        const service = this.getService();

        const employer = user.get('employeeType') === 'employee' ? (job.employer || {}) : user.toJS();

        return (
            <div className="single-job">
                <Whiteboard.Stubs noTopPadding={true}>
                    <AwImageCaption image={job.companyLogo} title={service ? service.name : 'Utkast'} subTitle={`på ${job.companyName}`} />
                </Whiteboard.Stubs>
                <Whiteboard.Stubs separatorTop={true} sizing="compact">
                    <div className="create-job-section single-job-employer-overview text-center">
                        <div className="row">
                            <div className="col-xs-4 -tile">
                                <div className="-label">Antal jobb</div>
                                <div className="-value">{employer.completedAndFilledJobsCount}</div>
                            </div>
                            <div className="col-xs-4 -tile">
                                <div className="-label">Registrerad sedan</div>
                                <div className="-value">{this.getEmployerCompletedMonths(employer)}</div>
                            </div>
                            <div className="col-xs-4 -tile">
                                <div className="-label">Antal omdömen</div>
                                <div className="-value">
                                    {/* <Link to={user.employeeType === 'employee' ? routes.candidateDashboard.clientReviews : routes.clientDashboard.reviews}> */}
                                    {((employer.employerInfo || {}).reviews || []).length}
                                    {/* </Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Whiteboard.Stubs>
                {this.renderParentJobMessage()}
                <Whiteboard.Stubs separatorTop={true}>
                    <div className="create-job-section">
                        <div className="row">
                            <div className="col-md-6">
                                <Whiteboard.SubTitle>OM JOBBET</Whiteboard.SubTitle>
                                <p>{nl2br(job.information || job.details || '')}</p>
                            </div>
                            <div className="col-md-6 single-job-details">
                                <Whiteboard.SubTitle>Detaljer</Whiteboard.SubTitle>
                                {this.renderDetails()}
                                <p className="text-right">
                                    <a target="_blank" href="https://intercom.help/instajobs/for-studenter-och-instajobbare/lon-kollektivavtal-och-arbetsvillkor/vad-innebar-ob">Hur fungerar OB?</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </Whiteboard.Stubs>
            </div>
        );
    }
}

export default SingleJob;
