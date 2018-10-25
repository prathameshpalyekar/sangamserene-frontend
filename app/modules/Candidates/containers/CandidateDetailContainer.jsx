import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import CandidateDetail from '../views/CandidateDetail.jsx';
import { fetchServices } from '../../Service/actions/apiActions.js';
import { newConversation } from '../../Chat/actions/chat.js';

import {
    candidateJobProfile,
    candidateProfile,
    createEmployerContract,
    sendJobOffer,
    saveCandidate,
    removeCandidateFromSaved,
    candidateNoShow,
    candidateTakeAway,
} from '../actions/list.js';

const mapStateToProps = (state, ownProps) => {

    return {
        user: state.getIn(['auth', 'user']),
        services: state.getIn(['services', 'data']),
        candidate: state.getIn(['candidates', 'candidate'])
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        candidateJobProfile(candidateId, jobId) {
            dispatch(candidateJobProfile(candidateId, jobId));
        },
        candidateProfile(candidateId) {
            dispatch(candidateProfile(candidateId));
        },
        saveCandidate (candidateId) {
            dispatch(saveCandidate(candidateId));
        },
        removeCandidateFromSaved (loggedEmployerId, candidateId) {
            dispatch(removeCandidateFromSaved(loggedEmployerId, candidateId));
        },
        fetchServices () {
            dispatch(fetchServices());
        },
        createEmployerContract (employeeId, jobId) {
            dispatch(createEmployerContract(employeeId, jobId));
        },
        openEmployerProfile (candidateId, jobId) {
            dispatch(push({
                pathname: `/dashboard/user/profile`,
                state: {
                    pathname: `/dashboard/job/${jobId}/candidates/applied`,
                    candidateId: candidateId
                },
            }));
        },
        candidateTakeAway (employeeId, jobId) {
            dispatch(candidateTakeAway(employeeId, jobId))
        },
        candidateNoShow (employeeId, jobId) {
            dispatch(candidateNoShow(employeeId, jobId))
        },
        newConversation (candidate) {
            dispatch(newConversation(candidate));
            dispatch(push({
                pathname: `/dashboard/chat/new`,
                state: {},
            }));
        },
        writeReview (jobId, employeeId) {
            dispatch(push({
                pathname: `/dashboard/review/candidate/${employeeId}`,
                state: {
                    jobId: jobId
                },
            }));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDetail);
