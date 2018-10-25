import { connect } from 'react-redux';

import Candidates from '../views/Candidates.jsx';

import { getCandidatesByType } from '../actions/list.js';

const mapStateToProps = (state, ownProps) => {
    const { params } = ownProps.match;
    const candidatesState = state.get('candidates');
    const data = candidatesState.getIn(['byCandidateType', params.type]);
    const loggedUser = state.getIn(['auth', 'user']);

    if (!data) {
        return {
            loggedUser,
        };
    }

    return {
        isFetching: data.get('isFetching'),
        errorMessage: data.get('errorMessage'),
        candidates: data.get('candidates'),
        loggedUser,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        getCandidatesByType (employerId, type) {
            const { params } = props.match;
            dispatch(getCandidatesByType(employerId, type));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);
