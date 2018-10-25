import React, { Component } from 'react';
import ReactSVG from 'react-svg';

import ServiceIcons from '../../Service/constants/service_icons.js';
import JobDateView from './JobDateView.jsx';

import '../less/JobListItem.less';

class JobItem extends Component {

    render() {
        const { job } = this.props;
        const jobToJs  = job.toJS();
        return (
            <div className="row">
                <div className="col-xs-4 col-md-4 job-type-icon">
                    { jobToJs.service ? <ReactSVG path={ServiceIcons.getServiceImage(jobToJs.service.systemName, 'filled')} /> : null }
                    { jobToJs.status === 'soft_delete' || jobToJs.status === 'cancel'  ? <p className="cancelled text-center">Inställt</p> : null }
                    { jobToJs.example === true  ? <p className="example-job">exempel</p> : null }
                </div>
                <div className="col-xs-8 col-md-8">
                    <h3>{jobToJs.service ? jobToJs.service.name : 'Utkast'}</h3>
                    <JobDateView job={jobToJs} />
                </div>
            </div>
        );
    }
}
export default JobItem;
