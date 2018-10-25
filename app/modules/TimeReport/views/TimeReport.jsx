import React, { Component } from 'react';
import ReactSVG from 'react-svg';

import Whiteboard from 'components/ui/Whiteboard';
import AwImageCaption from 'components/ui/AwImageCaption';
import BackButton from 'components/BackButton';
import Loader from 'components/Loader';
import ServiceIcons from '../../Service/constants/service_icons.js';

import JobDate from '../../Jobs/components/JobDate.jsx';

import TimeReportItemContainer from '../containers/TimeReportItemContainer.jsx';

import '../less/TimeReport.less';

class TimeReport extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount () {
        const { fetchTimeReport } = this.props;

        fetchTimeReport();
    }

    calculateHours(duration) {
        const hours = parseInt(duration/60, 10)
        const mins = duration % 60;
        let label = '';
        if (hours === 0 && mins === 0) {
            label = '0h';
        }
        if (mins !== 0) {
            label = `${mins}m`;
        }
        if (hours !== 0) {
            label= `${hours}h ${label}`
        }
        return label;
    }

    render() {
        const { timereport, isFetching } = this.props;

        if (isFetching || timereport === undefined) {
            return (
                <Loader />
            );
        }
        const job = timereport.get('job').toJS();
        const service = timereport.get('service').toJS();
        const days = timereport.get('days').toJS();

        const reportedTotalPerEmployee = timereport.get('reportedTotalPerEmployee').toJS();
        const timeReports = Object.values(reportedTotalPerEmployee);

        return (
            <div>
                <div className="center-content-section"><BackButton /></div>
                <div className="time-report-wrap">
                    <Whiteboard.Title>Tidrapportera</Whiteboard.Title>
                    <Whiteboard.Stubs noTopPadding={true} className="bottom-border">
                        <ReactSVG className="aw-imagecaption-image" path={ServiceIcons.getServiceImage(service.systemName, 'filled')} />
                        <AwImageCaption title={service ? service.name : 'Utkast'} subTitle={<JobDate job={job} hideInfo={true} />} />
                    </Whiteboard.Stubs>
                    {
                        job.type === 'deadline' && timeReports.length
                        ?
                        <div className="-reporterat">
                            <h3 className="">RAPPORTERAT</h3>
                            {
                                timeReports.map((employee, index) => {
                                    return (
                                        <p key={index}>{employee.firstName} {employee.lastName}: {this.calculateHours(employee.totalMins)}/{job.numberOfHours}h</p>
                                    )
                                })
                            }
                        </div>
                        :
                        null
                    }
                    {
                        days && days.length ?
                        (days || []).map((ob, i) => <TimeReportItemContainer
                            key={i}
                            day={ob}
                            job={job}
                            />)
                        :
                        <div className="no-records-wrap">
                            <p>
                                Det finns inga tider att rapportera in på det här jobbet just nu.
                            </p>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default TimeReport;
