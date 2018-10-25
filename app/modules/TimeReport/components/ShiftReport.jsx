import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
// TODO: import ChatLink

import Whiteboard from 'components/ui/Whiteboard';
import AwImageCaption from 'components/ui/AwImageCaption';
import AwModal from 'components/ui/AwModal';

import '../less/ShiftReport.less';

class ShiftReport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showConfirmBox: false,
            confirmDialog: {
                onConfirm: null,
                confirmMessage: '',
                confirmTitle: '',
                yesText: 'Ja',
                noText: 'Stäng'
            }
        }

        this.confirmAndDisapproveShiftReport = this.confirmAndDisapproveShiftReport.bind(this);
        this.approveShiftReport = this.approveShiftReport.bind(this);
        this.handleBreakHoursChange = this.handleBreakHoursChange.bind(this);
        this.disapproveShiftReport = this.disapproveShiftReport.bind(this);
        this.writeReview = this.writeReview.bind(this);
        this.closeConfirmBox = this.closeConfirmBox.bind(this);
    }

    confirmAndDisapproveShiftReport() {
        this.setState({
            confirmDialog: {
                onConfirm: this.disapproveShiftReport,
                confirmTitle: null,
                confirmMessage: 'Är du säker på att du inte vill godkänna denna tidrapport?',
                yesText: 'OK',
                noText: 'NEJ'
            },
            showConfirmBox: true
        });
    }

    disapproveShiftReport() {
        this.props.disapproveShiftReport(this.props.shift.id);
        this.setState({showConfirmBox: false});
    }

    isEmployee() {
        return false;
    }

    writeReview(jobId, employeeId) {
        this.props.writeReview(jobId, employeeId);
    }

    approveShiftReport() {
        this.props.approveShiftReport(this.props.shift.id);
    }

    calculateTotalHours(startdate, enddate ) {
        const breakMinutes = this.state &&  this.state.breakMinutes ? this.state.breakMinutes : (this.props.shift.breakMinutes ? this.props.shift.breakMinutes : 0);
        const shiftDuration = enddate.diff(startdate, 'minutes') - breakMinutes;
        const hours = parseInt(shiftDuration / 60, 10);
        const mins = shiftDuration % 60;
        let label = '';
        if (hours === 0 && mins === 0) {
            label = '0h';
        }
        if (mins !== 0) {
            label = `${mins}m`;
        }
        if (hours !== 0) {
            label= `${hours}h ${label}`
        }
        return label;
    }

    handleBreakHoursChange(name, value) {
        this.setState({breakMinutes: value});
    }

    translateExperience(key) {
        const experienceMapping = {
            experienced: "Erfaren",
            beginner: "Nybörjare",
            no: "Ingen erfarenhet"
        };

        return experienceMapping[key];
    }

    closeConfirmBox() {
        this.setState({showConfirmBox: false});
    }

    renderConfirmBox() {
        const { showConfirmBox, confirmDialog } = this.state;

        if (!showConfirmBox) {
            return null;
        }

        return (
            <AwModal.Modal
                isOpen={true}
                onRequestClose={this.closeConfirmBox}
                ariaHideApp={false}
                className="attention-modal">
                <AwModal.Body>
                    <div className="text-center">
                        {
                            confirmDialog.confirmTitle ?
                            <h3>{confirmDialog.confirmTitle}</h3>
                            :
                            null
                        }
                        <p>{confirmDialog.confirmMessage}</p>
                        <button type="button" className="btn btn-default btn-filled" onClick={this.closeConfirmBox}>{confirmDialog.noText}</button>
                        <button type="button" className="btn btn-success btn-filled" onClick={confirmDialog.onConfirm}>{confirmDialog.yesText}</button>
                    </div>
                </AwModal.Body>
            </AwModal.Modal>
        );
    }

    render() {
        const { shift, changeHours, hideChangeHours , hideComments, job } = this.props;
        const employee = shift.employee || {};
        const startTime = moment(shift.reportedFromTime);
        const endTime = moment(shift.reportedToTime)
        const originalStartTime = moment(shift.originalFromTime);
        const originalEndTime = moment(shift.originalToTime);
        const startHour = startTime.format("HH:mm");
        const endHour = endTime.format("HH:mm");
        const originalStartHour = originalStartTime.format("HH:mm");
        const originalEndHour = originalEndTime.format("HH:mm");
        const breakMinutes = shift.breakMinutes ? shift.breakMinutes : 0;
        const totalHours = this.calculateTotalHours(startTime,endTime);
        const commentText = shift.comments || '';

        const jobType = job.type;

        return (
            <div>
                {this.renderConfirmBox()}
                <div className="shift-report">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="text-left">
                                {
                                //TODO: ChatLink
                                }
                                <Whiteboard.Stubs noTopPadding={true}>
                                    <AwImageCaption image={employee.profilePic} title={`${employee.firstName} ${employee.lastName}`} subTitle={this.translateExperience(employee.experience)} />
                                </Whiteboard.Stubs>
                                {
                                    <a onClick={this.writeReview.bind(this, job.id, employee.id)} className="-clickable -write-review">Ge ett omdöme</a>
                                }
                            </div>
                        </div>
                        <div className="col-md-8 shift-detail">
                            <div className="table-wrap">
                                <div className="row">
                                    <div className="col-md-8 -key">
                                        Originaltider
                                    </div>
                                    <div className="col-md-4 -value">
                                        {`${originalStartHour} - ${originalEndHour}`}
                                    </div>
                                </div>
                                {
                                    (!(startTime.isSame(originalStartTime) && endTime.isSame(originalEndTime)))
                                    ?
                                    <div className="row">
                                        <div className="col-md-8 -key">
                                            Rapporterade tider
                                        </div>
                                        <div className="col-md-4 -value">
                                            {`${startHour} - ${endHour}`}
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                                {
                                    hideChangeHours
                                    ?
                                    <div className="row">
                                        <div className="col-md-8 -key">
                                            Rast
                                        </div>
                                        <div className="col-md-4 -value">
                                            {`${breakMinutes} minuter`}
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            {
                                hideComments || commentText === ''
                                ?
                                null
                                :
                                <div>
                                    <hr />
                                    <div className="-shift-comment row">
                                        <h3>Kommentar från Instajobbaren</h3>
                                        <p>
                                            {
                                                commentText.split('\n').map(function(part) {
                                                    return (<span>{part}<br/></span>)
                                                })
                                            }
                                        </p>
                                    </div>
                                </div>
                            }
                            <div className="-total-hours row">
                                <div className="col-md-9 pl-0">Totalt antal jobbade timmar:</div>
                                <div className="col-md-3 text-right pr-0">{totalHours}</div>
                            </div>
                            {
                                this.props.info
                                ?
                                <div className="row well well-sm well-note text-center">{this.props.info}</div>
                                :
                                null
                            }
                            <div className="row">
                            {
                                this.props.hideDisapproveButton
                                ?
                                null
                                :
                                <div className="col-md-6 pl-0 pr-5">
                                    <button
                                        onClick={this.confirmAndDisapproveShiftReport}
                                        disabled={this.props.disableApproveRejectButtons}
                                        className="btn btn-danger btn-filled btn-block"
                                    >
                                        {this.props.disApproveButtonText}
                                    </button>
                                </div>
                            }
                            {
                                this.props.hideApproveButton
                                ?
                                null
                                :
                                <div className="col-md-6 pr-0 pl-5">
                                    <button
                                        onClick={this.approveShiftReport}
                                        className="btn btn-primary btn-filled btn-block"
                                        disabled={this.props.disableApproveRejectButtons}
                                    >
                                        {this.props.approveButtonText}
                                    </button>
                                </div>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShiftReport;
