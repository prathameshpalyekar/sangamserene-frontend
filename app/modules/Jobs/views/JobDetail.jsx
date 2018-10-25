import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Whiteboard from 'components/ui/Whiteboard';
import Loader from 'components/Loader';
import BackButton from 'components/BackButton';

import SingleJobContainer from '../containers/SingleJobContainer.jsx';

class JobDetail extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount () {
        const { fetchJob } = this.props;

        fetchJob();
    }

    render () {
        const { isFetching, job } = this.props;

        if (isFetching) {
            return <Loader />;
        }

        return (
            <div>
                <div className="center-content-section"><BackButton /></div>
                <Whiteboard.Title>Granska Jobb</Whiteboard.Title>
                <SingleJobContainer job={job} />
            </div>
        );
    }
}

export default JobDetail;
