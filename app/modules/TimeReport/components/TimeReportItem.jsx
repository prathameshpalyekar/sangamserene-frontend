import React, { Component } from 'react';

import DayReport from './DayReport.jsx';
import ShiftReport from './ShiftReport.jsx';

class TimeReportItem extends Component {

    constructor(props) {
        super(props)

        this.state = {};
        this.approveShiftReport = this.approveShiftReport.bind(this);
        this.disapproveShiftReport = this.disapproveShiftReport.bind(this);
    }

    approveShiftReport(shiftReportId) {
        this.props.approveShiftReport(this.props.job.id, shiftReportId);
    }

    disapproveShiftReport(shiftReportId) {
        this.props.disapproveShiftReport(this.props.job.id, shiftReportId);
    }

    shiftReportInfo(shift) {
        if (shift.employerStatus == 'rejected') {
            return (
                <p>
                    Du har inte godkänt denna tidrapport. Kontakta gärna Instajobs-teamet för mer information på <a href="mailto:work@instajobs.com"> work@instajobs.com </a>
                </p>
            )
        } else if (shift.employerStatus == 'approved') {
            return (
                <p>Denna tidrapport har godkänts av dig</p>
            )
        } else if (shift.employerStatus == 'auto_approved') {
            return (
                <p>Denna tidrapport har godkänts automatiskt efter 36 timmar</p>
            )
        } else if (shift.employerStatus == 'auto_approved') {
            return (
                <p>Denna tidrapport har godkänts automatiskt efter 36 timmar</p>
            )

        } else if (shift.employeeStatus == 'pending') {
            return (
                <p>När jobbet är slutfört kan du tidrapportera här</p>
            )
        }
        return null;
    }

    shouldHideApproveButton(shift) {
        return shift.employerStatus !== 'pending';
    }

    shouldHideDisapproveButton(shift) {
        return shift.employerStatus !== 'pending';
    }

    shouldDisableApproveRejectButtons(shift) {
        return shift.employeeStatus === 'pending';
    }

    render() {
        const { day, job } = this.props;
        return (
            <DayReport day={day}>
                {
                    day.shifts.map((shift, index) => {
                        return (
                            <div key={index}>
                                {
                                    <ShiftReport {...this.props}
                                        info={this.shiftReportInfo(shift)}
                                        approveButtonText="Godkänn tider"
                                        disApproveButtonText="Godkänn ej tider"
                                        hideDisapproveButton={this.shouldHideDisapproveButton ? this.shouldHideDisapproveButton(shift) : false}
                                        hideApproveButton={this.shouldHideApproveButton ? this.shouldHideApproveButton(shift) : false}
                                        approveShiftReport={this.approveShiftReport}
                                        disapproveShiftReport={this.disapproveShiftReport}
                                        hideChangeHours = {true}
                                        disableApproveRejectButtons = { this.shouldDisableApproveRejectButtons ? this.shouldDisableApproveRejectButtons(shift) : false }
                                        hideComments = {false}
                                        shift={shift}
                                        job={job}
                                    />
                                }
                            </div>
                        )
                    })
                }
            </DayReport>
        );
    }
}

export default TimeReportItem;
