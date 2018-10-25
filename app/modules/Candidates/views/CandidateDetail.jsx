import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import CandidateIntro from '../components/CandidateIntro.jsx';
import SendOfferButton from '../components/SendOfferButton.jsx';
import ShortPresentation from '../components/ShortPresentation.jsx';
import CandidateServices from '../components/CandidateServices.jsx';
import Studies from '../components/Studies.jsx';
import Licenses from '../components/Licenses.jsx';
import CandidateReviews from '../components/CandidateReviews.jsx';

import UserValidationForScrive from 'components/Scrive/UserValidationForScrive.jsx';
import AwModal from 'components/ui/AwModal';

import NoShowButton from '../components/NoShowButton.jsx';
import TakeAwayButton from '../components/TakeAwayButton.jsx';

import '../less/CandidateDetail.less';

class CandidateDetail extends Component {

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

        this.handleSendJobOfferClick = this.handleSendJobOfferClick.bind(this);
        this.createEmployerContract = this.createEmployerContract.bind(this);
        this.openEmployerProfile = this.openEmployerProfile.bind(this);

        this.confirmCandidateTakeAway = this.confirmCandidateTakeAway.bind(this);
        this.candidateTakeAway = this.candidateTakeAway.bind(this);

        this.candidateNoShow = this.candidateNoShow.bind(this);

        this.closeConfirmBox = this.closeConfirmBox.bind(this);
        this.confirmProfileUpdate = this.confirmProfileUpdate.bind(this);
        this.confirmCreateEmployerContract = this.confirmCreateEmployerContract.bind(this);
        this.writeReview = this.writeReview.bind(this);
    }

    componentWillMount() {
        const { job } = this.props;

        this.props.fetchServices();

        if (job) {
            this.props.candidateJobProfile(this.props.selectedCandidate.id, this.props.job.id);
        } else {
            this.props.candidateProfile(this.props.selectedCandidate.id);
        }
    }

    handleSendJobOfferClick() {
        const { user } = this.props;
        if (user.get('isContractSigned') || UserValidationForScrive.validateUser(user)) {
            this.confirmCreateEmployerContract();
        } else {
            this.confirmProfileUpdate();
        }
    }

    confirmCreateEmployerContract() {
        this.setState({
            confirmDialog: {
                onConfirm: this.createEmployerContract,
                confirmTitle: 'Tänk på att det är bindande!',
                confirmMessage: 'Om och när instajobbaren har tackat ja till ditt erbjudande är det bindande. Du kan fortfarande ställa in men är bunden att betala för antal timmar enligt annons. Du kan skicka så många erbjudanden du vill. Bara det antal personer du söker kan tacka ja. På det sättet kan du öka dina chanser att tillsätta jobbet snabbt.',
                yesText: 'Skicka',
                noText: 'Avbryt'
            },
            showConfirmBox: true
        });
    }

    createEmployerContract() {
        this.props.createEmployerContract(this.props.selectedCandidate.id, this.props.job.id);
        this.setState({showConfirmBox: false});
    }

    confirmProfileUpdate() {
        this.setState({
            confirmDialog: {
                onConfirm: this.openEmployerProfile,
                confirmTitle: '',
                confirmMessage: 'För att erbjuda någon ett jobb måste din profil vara ifylld. Gå till profilen för att uppdatera din information.',
                yesText: 'Uppdatera mina uppgifter',
                noText: 'Avbryt'
            },
            showConfirmBox: true,
        });
    }

    openEmployerProfile() {
        this.props.openEmployerProfile(this.props.selectedCandidate.id, this.props.job.id);
        this.setState({showConfirmBox: false});
    }

    confirmCandidateTakeAway() {
        this.setState({
            confirmDialog: {
                onConfirm: this.candidateTakeAway,
                confirmTitle: '',
                confirmMessage: 'Är du säker på att du vill ta bort instajobbaren från listan?',
                yesText: 'Ja',
                noText: 'Avbryt'
            },
            showConfirmBox: true,
        });
    }

    candidateTakeAway() {
        this.props.candidateTakeAway(this.props.selectedCandidate.id, this.props.job.id);
        this.setState({showConfirmBox: false});
    }

    candidateNoShow() {
        this.props.candidateNoShow(this.props.selectedCandidate.id, this.props.job.id)
    }

    closeConfirmBox() {
        this.setState({showConfirmBox: false});
    }

    renderConfirmBox() {
        const { showConfirmBox, confirmTitle, confirmDialog } = this.state;

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

    writeReview(jobId, employeeId) {
        this.props.writeReview(jobId, employeeId);
    }

    render() {
        const { candidate, user, services, match, job } = this.props;
        if (candidate === undefined)
            return (<div><span></span></div>);

        const employeeInfo = candidate.employeeInfo || {};
        const reviews = employeeInfo.reviews || [];
        const reviewNumberString = reviews.length + ' ' + (reviews.length === 1 ? 'Omdöme' : 'Omdömen');

        const sendOfferButtonVisible = !candidate.offerReceived && !candidate.alreadyHired && candidate.alreadyApplied;

        const userIsEmployer = true;
        const noShowButtonVisible = userIsEmployer && candidate.alreadyHired;
        const takeAwayVisible = userIsEmployer && !candidate.offerReceived && !candidate.alreadyHired;

        return (
            <div>
                {this.renderConfirmBox()}
                <div className="candidate-detail">
                    {
                        candidate.canGiveReview
                        ?
                        <div className="write-review-link-wrap">
                            <a onClick={this.writeReview.bind(this, job.id, candidate.id)} className="-clickable -write-review">Ge ett omdöme</a>
                        </div>
                        :
                        null
                    }
                    <CandidateIntro {...this.props}  />
                    <hr className="hr-separtor-1" />
                    {
                        sendOfferButtonVisible ?
                        <SendOfferButton clickHandler={this.handleSendJobOfferClick} />
                        :
                        null
                    }
                    <ShortPresentation employeeInfo={employeeInfo} />
                    <Studies employeeInfo={employeeInfo} />
                    <Licenses employeeInfo={employeeInfo} />
                    {
                        job
                        ?
                        <CandidateServices services={services} employeeInfo={employeeInfo} />
                        :
                        null
                    }
                    <CandidateReviews
                        reviews={reviews}
                        reviewNumberString={reviewNumberString}
                        averageReviewRating={candidate.averageReviewRating} />
                    {
                        job && noShowButtonVisible
                        ?
                        <NoShowButton clickHandler={this.candidateNoShow} />
                        :
                        null
                    }
                    {
                        job && takeAwayVisible
                        ?
                        <TakeAwayButton clickHandler={this.confirmCandidateTakeAway} />
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

export default CandidateDetail;
