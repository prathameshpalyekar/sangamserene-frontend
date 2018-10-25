import React, { Component } from 'react';

import Whiteboard from 'components/ui/Whiteboard';
import Loader from 'components/Loader';

import CopyJobItemContainer from '../../containers/CopyJobItemContainer.jsx';

import '../../less/CopyJob.less';

class CopyJob extends Component {

    componentDidMount() {
        this.props.jobsWithoutCancel();
    }

    render() {
        const { jobsList, isFetching } = this.props;

        if (isFetching || jobsList === undefined) {
            return (
                <Loader />
            );
        }

        return (
            <div className="job-list-for-copy">
                <Whiteboard.Title>Skapa kopia på tidigare jobb</Whiteboard.Title>
                <div className="jobs-list-for-copy-item">
                    {
                        jobsList.valueSeq().map((job, index) => {
                            return (
                                <CopyJobItemContainer key={index} job={job} />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default CopyJob;
