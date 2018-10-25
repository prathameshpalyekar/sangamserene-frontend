import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Immutable from 'immutable';
import moment from 'moment';

import CopyJobItem from '../components/CreateJob/CopyJobItem.jsx';

const mapStateToProps = (state, ownProps) => {

    return {
        job: ownProps.job
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        copyJob () {
            let { job } = ownProps;
            const jobId = job.get('id');

            dispatch(push({
                pathname: `/dashboard/jobs/${jobId}/copy`
            }));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyJobItem);
