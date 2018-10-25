import React, { Component } from 'react';
import Alert from 'react-s-alert';

import Loader from 'components/Loader';

import CandidatesListItemContainer from '../containers/CandidatesListItemContainer.jsx';

class Candidates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCandidate: null
        }
        this.viewCandidate = this.viewCandidate.bind(this);
    }

    componentDidMount() {
        const { getCandidatesByType, loggedUser, match: { params } } = this.props;
        const employerId = loggedUser.get('id');

        getCandidatesByType(employerId, params.type);
    }

    componentWillReceiveProps(nextProps) {
        const { match, isFetching, loggedUser, getCandidatesByType } = this.props;
        const employerId = loggedUser.get('id');
        const newMatch = nextProps.match;

        if ((!nextProps.isFetching) && nextProps.errorMessage) {
            Alert.error(nextProps.errorMessage);
            return false;
        }

        if (match.params.type !== newMatch.params.type) {
            getCandidatesByType(employerId, newMatch.params.type);
            this.setState({selectedCandidate: null});
        }
    }

    viewCandidate(candidate) {
        this.setState({selectedCandidate: this.state.selectedCandidate === candidate.id ? null : candidate.id})
    }

    render() {
        const { isFetching, candidates, match: { params } } = this.props;
        const { selectedCandidate } = this.state;

        if (isFetching) {
            return (
                <Loader />
            );
        }

        return (
            <div>
                <div className="whiteboard-header">
                    <h1 className="whiteboard-title">
                        { params.type === 'saved' ? 'Sparade profiler' : 'TIDIGARE ANLITADE' }
                    </h1>
                </div>
                {
                    candidates && candidates.size
                    ?
                        (candidates || []).map((candidate, i) => {
                            const candidateObj = candidate.toJS();
                            return (
                                <CandidatesListItemContainer
                                    viewCandidate={this.viewCandidate.bind(this)}
                                    selectedCandidate={selectedCandidate === candidate.get('id') ? candidateObj : null}
                                    candidate={candidateObj}
                                    key={i}
                                    count={i}
                                    moveViewProfileArrows={selectedCandidate ? true : false}
                                    showReviewButton={params.type === 'hired' ? true : false}
                                />
                            );
                        })
                    :
                    <div className="no-records-wrap">
                        {
                            params.type === 'saved'
                            ?
                            <p>Här sparar du kandidater från tidigare uppdrag som är dina favoriter. För att lägga till en kandidat tryck på hjärtat bredvid deras profilbild.</p>
                            :
                            <p>Du har just nu inga anlitade instajobbare</p>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default Candidates;
