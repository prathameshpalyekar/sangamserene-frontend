import React, { Component } from 'react';

import JobItem from '../JobItem.jsx';

class CopyJobItem extends Component {

    render() {
        const { job } = this.props;

        return (
            <div className="job-list-item">
                <div className="row">
                    <div className="col-md-6">
                        <JobItem job={job} />
                    </div>
                    <div className="col-md-6 text-center">
                        <button className="btn btn-primary btn-filled btn-block" onClick={this.props.copyJob}>Välj</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CopyJobItem;
