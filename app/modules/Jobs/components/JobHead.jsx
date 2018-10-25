import React, { Component } from 'react';
import moment from 'moment';

import JobDate from './JobDate.jsx';
import '../less/JobHead.less';

class JobHead extends Component {

    render() {
        const { job } = this.props;

        return (
            <div className="job-head text-center">
                <h3>{job.service.name}</h3>
                <JobDate {...this.props} />
            </div>
        );


    }
}

export default JobHead;
