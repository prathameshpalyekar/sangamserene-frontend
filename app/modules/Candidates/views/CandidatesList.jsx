import React, { Component } from 'react';
import _ from 'lodash';
import Alert from 'react-s-alert'
import { Link } from 'react-router-dom';

import BackButton from 'components/BackButton';
import Loader from 'components/Loader';
import FilterBox from 'components/FilterBox';

import CandidatesListItemContainer from '../containers/CandidatesListItemContainer.jsx';
import JobHead from '../../Jobs/components/JobHead.jsx';
import CandidatesFilterNavContainer from '../containers/CandidateFilterNavContainer.jsx';
import SortOptions from '../components/SortOptions.jsx';

import ChatIcon from '../../../components/Icons/svg/messenger-active.svg';

const SORT_COLUMNS = [
    { label: 'Antal utförda Instajobs', value: 'completedJobs' },
    { label: 'Omdöme', value: 'rating' },
    { label: 'Sparade profiler', value: 'savedCandidates' }
];

class CandidatesList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sort: SORT_COLUMNS[0],
            selectedCandidate: null
        }
        this.sortCandidates = this.sortCandidates.bind(this);
        this.viewCandidate = this.viewCandidate.bind(this);
    }

    componentDidMount() {
        const { fetchCandidatesList, isFetching, errorMessage, location } = this.props;

        if (location.state && location.state.candidateId) {
            this.setState({selectedCandidate:location.state.candidateId});
        }

        if ( (! isFetching) && errorMessage) {
            Alert.error(errorMessage);
        }

        fetchCandidatesList();
    }

    componentWillReceiveProps(nextProps) {
        const { match, isFetching } = this.props;
        const newMatch = nextProps.match;

        if ( (! nextProps.isFetching) && nextProps.errorMessage) {
            Alert.error(nextProps.errorMessage);
        }

        if (match.params.type !== newMatch.params.type) {
            nextProps.fetchCandidatesList();
            this.setState({selectedCandidate: null});
        }
    }

    sortCandidates(sortColumn) {
        this.setState({
            sort: sortColumn,
            selectedCandidate: null
        });
    }

    viewCandidate(candidate) {
        this.state.selectedCandidate && this.state.selectedCandidate == candidate.id ?
            this.setState({selectedCandidate: null})
            :
            this.setState({selectedCandidate: candidate.id})
    }

    openBroadcastChat(section) {
        this.props.openBroadcastChat(this.props.job, section);
    }

    render() {
        const { job = {}, match: { path, params}, location, isFetching } = this.props;
        const { selectedCandidate } = this.state;

        if (isFetching) {
            return (
                <Loader />
            );
        }
        const { offerSentCandidates, appliedCandidates, hiredCandidates } = job;

        const FilterBoxItems = [];
        if (offerSentCandidates > 0) {
            FilterBoxItems.push({
                title: 'Alla som fått erbjudande',
                callback: this.openBroadcastChat.bind(this, 'OFFERSENT')
            });
        }
        if (appliedCandidates > 0) {
            FilterBoxItems.push({
                title: 'Alla som sökt jobbet',
                callback: this.openBroadcastChat.bind(this, 'APPLIED')
            });
        }
        if (hiredCandidates > 0) {
            FilterBoxItems.push({
                title: 'De som blivit anlitade',
                callback: this.openBroadcastChat.bind(this, 'HIRED')
            });
        }
        const FilterBoxTitle = 'Starta chat med';

        const candidates = job ? (job.candidates || []).slice(0) : [];
        const sortColumn = this.state.sort.value || null;

        if (candidates && candidates.length) {
            candidates.sort((a, b) => {
                switch (sortColumn) {
                    case 'rating':
                        return b.averageReviewRating - a.averageReviewRating;
                        break;
                    case 'savedCandidates':
                        return b.savedCandidateScore - a.savedCandidateScore;
                        break;
                    default:
                        return (b[sortColumn] - a[sortColumn]);
                }
            });
        }

        return (
            <div>
                <div className="center-content-section"><BackButton /></div>
                <div className="joob-candidates-list-wrapper">
                    {
                    _.isEmpty(job) ?
                    null
                    :
                    <div>
                        <JobHead job={job} />
                        <CandidatesFilterNavContainer job={job} tab={params.type} />
                    </div>
                    }
                    <div className="center-content-section -large">
                        <div className="row">
                            <div className="col-md-7 text-left">
                                <SortOptions
                                    sortColumns={SORT_COLUMNS}
                                    sortCandidates={this.sortCandidates}
                                />
                            </div>
                            <div className="col-md-5 text-right">
                                <FilterBox
                                    items={FilterBoxItems}
                                    title={FilterBoxTitle}
                                    icon={ChatIcon}
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="hr-separator" />
                    { candidates === undefined ? <Loader /> : null}
                    {
                        candidates && candidates.length ?
                            (candidates || []).map((candidate, i) => {
                                return (
                                    <CandidatesListItemContainer
                                    job={job}
                                    viewCandidate={this.viewCandidate.bind(this)}
                                    selectedCandidate={selectedCandidate === candidate.id ? candidate : null}
                                    candidate={candidate}
                                    key={i}
                                    count={i}
                                    moveViewProfileArrows={selectedCandidate ? true : false}
                                    />
                                );
                            })
                       :
                       null
                    }
                    {
                        candidates && candidates.length == 0 ?
                        <div className="no-records-wrap">
                            <p>
                                Här sparar du kandidater från tidigare uppdrag som är dina favoriter. För att lägga till en kandidat tryck på hjärtat bredvid deras profilbild.
                            </p>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

export default CandidatesList;
