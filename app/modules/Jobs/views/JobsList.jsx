import React, { Component } from 'react';

import Loader from 'components/Loader';

import JobListItemContainer from '../containers/JobListItemContainer.jsx';

class JobsList extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount () {
        const { fetchJobs } = this.props;

        fetchJobs();
    }

    componentWillReceiveProps (nextProps) {
        const { match } = this.props;
        const newMatch = nextProps.match;

        if (match.params.type !== newMatch.params.type) {
            // Fetch selected type jobs
            nextProps.fetchJobs();
        }
    }

    render() {
        const { jobs, isFetching } = this.props;

        if (isFetching) {
            return (
                <Loader />
            )
        }

        return (
            <div className="job-list">
                {
                    jobs && jobs.length ?
                    (jobs || []).map((ob, i) => <JobListItemContainer job={ob} key={i} />)
                    :
                    <div className="no-records-wrap">
                        <p>Här ser du de jobb som är bekräftade. Gå till dina öppna jobb för att se dina senaste ansökningar och för att skicka ett erbjudande.</p>
                    </div>
                }
            </div>
        )
    }
}

export default JobsList;
