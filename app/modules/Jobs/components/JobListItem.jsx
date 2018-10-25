import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { Redirect } from 'react-router-dom';
import Alert from 'react-s-alert';

import '../less/JobListItem.less';

import ServiceIcons from '../../Service/constants/service_icons.js';

import IconStallIn from '../../../components/Icons/svg/icon-stall-in.svg';
import IconRedigera from '../../../components/Icons/svg/icon-redigera.svg';
import IconGranska from '../../../components/Icons/svg/icon-granska.svg';
import IconTidrapportera from '../../../components/Icons/svg/icon-tidrapportera.svg';
import AwModal from 'components/ui/AwModal';

import JobDateView from './JobDateView.jsx';

class JobListItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cancelled: false,
            showConfirmBox: false
        };
        this.cancelJob = this.cancelJob.bind(this);

        this.confirmCancelJob = this.confirmCancelJob.bind(this);
        this.closeCancelJob = this.closeCancelJob.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        const { cancelState } = this.props;

        if (cancelState && nextProps && cancelState.get('cancelling') && !nextProps.cancelState.get('cancelling')) {
            if (nextProps.cancelState.get('cancelled')) {
                // Hide from list
                this.setState({
                    cancelled: true,
                });

                // Show alert that it is cancelled;
                Alert.success('Job Item cancelled successfully.');
            } else {
                // Show alert that it failed to cancel;
                Alert.error(nextProps.cancelState.get('errorMessage') || 'Failed to cancel job.');
            }
        }
    }

    confirmCancelJob() {
        this.setState({showConfirmBox: true});
    }

    closeCancelJob() {
        this.setState({showConfirmBox: false});
    }

    cancelJob() {
        this.setState({showConfirmBox: false});
        this.props.cancelJob();
    }

    renderConfirmBox() {
        const { showConfirmBox } = this.state;

        if (!showConfirmBox) {
            return null;
        }

        return (
            <AwModal.Modal
                isOpen={true}
                onRequestClose={this.closeCancelJob}
                ariaHideApp={false}
                className="attention-modal">
                <AwModal.Body>
                    <div className="text-center">
                        <p>Är du säker på att du vill ställa in jobbet?</p>
                        <button type="button" className="btn btn-default btn-filled" onClick={this.closeCancelJob}>Nej</button>
                        <button type="button" className="btn btn-danger btn-filled" onClick={this.cancelJob}>Ja</button>
                    </div>
                </AwModal.Body>
            </AwModal.Modal>
        );
    }

    render() {
        const { job, dashboard } = this.props;
        const { cancelled } = this.state;

        if (cancelled) {
            return null;
        }

        return (
            <div>
                {this.renderConfirmBox()}
                <div className="job-list-item">
                    <div className="row -clickable" onClick={job.status === "draft" ? this.props.editJob : this.props.openCandidatesList}>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-xs-4 col-md-4 job-type-icon">
                                    {job.service ? <ReactSVG path={ServiceIcons.getServiceImage(job.service.systemName, 'filled')} /> : null}
                                    {job.status === 'soft_delete' || job.status === 'cancel'  ? <p className="cancelled text-center">Inställt</p> : null}
                                    {job.example === true  ? <p className="example-job">exempel</p> : null}
                                </div>
                                <div className="col-xs-8 col-md-8">
                                    <h3>{job.service ? job.service.name : 'Utkast'}</h3>
                                    <JobDateView job={job} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row job-detail">
                                <div className="col-md-4 job-detail-col">
                                    <div className="detail">
                                        <p className="value">{job.appliedEmployees || 0}</p>
                                        <p className="title">Ansökningar</p>
                                    </div>
                                </div>
                                <div className="col-md-4 job-detail-col">
                                    <div className="detail">
                                        <p className="value">{job.offerSentEmployees || 0}</p>
                                        <p className="title">Erbjudanden</p>
                                    </div>
                                </div>
                                <div className="col-md-4 job-detail-col">
                                    <div className="detail">
                                        <p className="value">{job.hiredEmployees || 0}/{job.noOfPersons || 0}</p>
                                        <p className="title">Anlitade</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item-actions text-right">
                        <ul>
                            {
                                job.status === 'soft_delete' || job.status === 'cancel'
                                ?
                                null
                                :
                                <li>
                                    <button className="plain-btn" onClick={this.confirmCancelJob}><ReactSVG path={IconStallIn} />Ställ in</button>
                                </li>
                            }
                            {
                                job.status !== 'draft'
                                ?
                                <li>
                                    <button className="plain-btn -green" onClick={this.props.openTimeReport}><ReactSVG path={IconTidrapportera} />Tidrapportera</button>
                                </li>
                                :
                                null
                            }
                            {
                                job.example === true
                                ?
                                null
                                :
                                <li>
                                    <button className="plain-btn -green" onClick={this.props.editJob}><ReactSVG path={IconRedigera} />Redigera</button>
                                </li>
                            }
                            <li>
                                <button className="plain-btn -green" onClick={this.props.openJobDetails}><ReactSVG path={IconGranska} />Granska</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}

export default JobListItem;
