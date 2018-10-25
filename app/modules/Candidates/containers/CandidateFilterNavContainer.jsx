import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import CandidatesFilterNav from '../components/CandidatesFilterNav.jsx';

const mapStateToProps = (state, ownProps) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, props) => {

    return {
        switchTab (tab) {
            const { job } = props

            dispatch(replace(`/dashboard/job/${job.id}/candidates/${tab}`));

            return false;
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidatesFilterNav);
