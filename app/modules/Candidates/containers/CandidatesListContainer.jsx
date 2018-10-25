import { connect } from 'react-redux';
 import { push } from 'react-router-redux';

import CandidatesList from '../views/CandidatesList.jsx';
import { candidateJobProfile, fetchCandidatesList } from '../actions/list.js';
import { fetchConversations, setCurrentConversationId } from '../../Chat/actions/chat.js';

const mapStateToProps = (state, ownProps) => {
    const { params } = ownProps.match;

    const candidatesState = state.get('candidates');

    const data = candidatesState.getIn(['byFilterType', params.type])

    if (!data) {
        return {};
    }

    return {
        isFetching: data.get('isFetching'),
        errorMessage: data.get('errorMessage'),
        job: data.get('job'),
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchCandidatesList () {
            const { params } = props.match;
            dispatch(fetchCandidatesList(params.id, params.type))
        },
        candidateJobProfile (candidateId, jobId) {
            dispatch(candidateJobProfile(candidateId, jobId))
        },
        fetchConversations () {
            dispatch(fetchConversations());
        },
        openBroadcastChat (job, type) {
            const path = '/dashboard/chat/broadcast/new';
            dispatch(setCurrentConversationId(null));
            dispatch(push({
                pathname: path,
                state: {
                    job: job,
                    type: type
                },
            }));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidatesList);
