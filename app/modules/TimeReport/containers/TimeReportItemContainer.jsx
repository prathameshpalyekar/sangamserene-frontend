import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import TimeReportItem from '../components/TimeReportItem.jsx';
import { approveShiftReport, disapproveShiftReport } from '../actions/timereport.js';

const mapStateToProps = (state, ownProps) => {
    return {
        day: ownProps.day,
        job: ownProps.job
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        approveShiftReport (jobId, shiftReportId) {
            dispatch(approveShiftReport(jobId, shiftReportId));
        },
        disapproveShiftReport (jobId, shiftReportId) {
            dispatch(disapproveShiftReport(jobId, shiftReportId));
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeReportItem);
