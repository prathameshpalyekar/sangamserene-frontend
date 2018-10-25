import React, { Component } from 'react';
import { HashLink } from 'react-router-hash-link';
import ReactSVG from 'react-svg';

import StarRating from 'components/StarRating';
import '../less/CandidateIntro.less';

import yesIcon from '../images/yesIconGreen.png';
import noIcon from '../images/noIconGreen.png';
import profilePlaceholder from '../images/placeholder_profile_dark.png';
import ChatIcon from '../../../components/Icons/svg/messenger-active.svg';

class CandidateIntro extends Component {

    constructor(props) {
        super(props);

        this.startConversation = this.startConversation.bind(this);
    }

    isFavourite() {
        const { candidate, user } = this.props;
        const savedCandidates = user.getIn(['employerInfo', 'savedCandidates']);

        if (savedCandidates) {
            for (let i = 0; i< savedCandidates.size; i++) {
                if (savedCandidates.get(i) == candidate.id) {
                    return true;
                }
            }
        }
        return false;
    }

    startConversation() {
        const { candidate } = this.props;
        this.props.newConversation(candidate);
    }

    render() {
        const { candidate, user } = this.props;
        const { completedJobs, completedJobsCount } = candidate;
        const profilePic = candidate.profilePic || profilePlaceholder;

        const userType = 'employer';
        const loggedUserId = user.get('id');
        const employeeInfo = candidate.employeeInfo || {};

        const reviews = employeeInfo.reviews || [];
        const reviewNumberString = reviews.length + ' ' + (reviews.length === 1 ? 'Omdöme' : 'Omdömen');

        return (
            <div className="candidate-intro">
                <div className="start-conversation" onClick={this.startConversation}>
                    <ReactSVG path={ChatIcon} />
                </div>
                <div className="avatar" style={{
                    backgroundImage: "url(" + profilePic + ")"
                }}>
                    <span className="exp-lvl">Erfaren</span>
                    <div className="favourite-container">
                        { this.isFavourite() ?
                        <div
                            className="favourite"
                            onClick={this.props.removeCandidateFromSaved.bind(this, loggedUserId, candidate.id)}>
                            <div className="heart-container">
                                <span className="outer-heart glyphicon glyphicon-heart"></span>
                                <span className="inner-heart glyphicon glyphicon-heart"></span>
                            </div>
                            <div className="-desc">Ta bort från<br/>sparade</div>
                        </div>
                        :
                        <div
                            className="favourite"
                            onClick={this.props.saveCandidate.bind(this, candidate.id)}>
                            <div className="heart-container">
                                <span className="outer-heart glyphicon glyphicon-heart"></span>
                                <span className="inner-heart glyphicon glyphicon-heart-empty"></span>
                            </div>
                            <div className="-desc">Spara<br/>kandidat</div>
                        </div>
                        }
                    </div>
                </div>
                <h2 className="name">
                    {candidate.firstName + ' ' + (candidate.alreadyHired ? candidate.lastName : candidate.lastName.slice(0,1))}
                </h2>

                <p className="location">
                    {this.props.candidate.zipCode}
                </p>
                <div className="rating">
                    <StarRating rate={false} rating={candidate.averageReviewRating} displayValue={null} />
                    <span className="reviews"><HashLink to="#reviews">{reviewNumberString}</HashLink></span>
                </div>
                <div className="row -overview">
                    <div className="col-xs-4 tile">
                        <div className="-name">Utförda<br/>Instajobs</div>
                        <div className="-value">{completedJobsCount}</div>
                    </div>
                    <div className="col-xs-4 tile">
                        <div className="-name">Intervjuad av<br/>Instajobs</div>
                        <div className="-value"><img src={employeeInfo.hasInterviewed ? yesIcon : noIcon} /></div>
                    </div>
                    <div className="col-xs-4 tile">
                        <div className="-name">Arbetat för<br/>Academic work</div>
                        <div className="-value"><img src={employeeInfo.hasWorkedWithAw ? yesIcon : noIcon} /></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CandidateIntro;

