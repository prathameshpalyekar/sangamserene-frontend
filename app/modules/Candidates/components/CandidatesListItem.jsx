import React, { Component } from 'react';
import cx from 'classnames';
import moment from 'moment';

import StarRating from 'components/StarRating';
import CandidateDetail from '../containers/CandidateDetailContainer.jsx';

import { Link } from 'react-router-dom';

import '../less/CandidateListItem.less';

class CandidatesListItem extends Component {

    constructor(props) {
        super(props);

        this.isReportedSick = this.isReportedSick.bind(this);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    formatDate(date) {
        if (!date) {
            return (
                <span>-</span>
            )
        }
        const momentDate = moment(date)
        if (momentDate) {
            return (
                <span>
                    {momentDate.format('ddd, ')}
                    <strong>{momentDate.format('MMM Do ')}</strong>
                    {momentDate.format('YYYY')}
                </span>
            )

        } else {
            return (
                <span>-</span>
            )
        }
    }

    isReportedSick(shifts) {
        return (shifts || []).some((shift) => {
            return shift.employeeReportedSick;
        })
    }

    getSickReportedShifts(obj) {
        return obj.employeeReportedSick === true;
    }

    render() {
        const { candidate, selectedCandidate, moveViewProfileArrows, showReviewButton } = this.props;

        let sickReportedShifts = [];
        if (candidate.shiftReports) {
            sickReportedShifts = candidate.shiftReports.filter(this.getSickReportedShifts);
        }

        const classNames = cx('', {
            'selected': selectedCandidate,
            'job-candidates-list-item': true,
            '-clickable': true,
            'profile-popup-on': moveViewProfileArrows
        });

        return (
            <div>
                <div className={classNames} onClick={this.props.viewCandidate.bind(this, candidate)}>
                    <div className="view-profile-link">
                        {
                            selectedCandidate ?
                            'Dölj profil'
                            :
                            'Visa profil'
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            <img src={candidate.profilePic} className="candidate-pic img-circle" />
                        </div>
                        <div className="col-md-10">
                            { candidate.hasJobRecommended ? <p className='-tip'>Tips från Instajobs</p> : null }
                            { candidate.isReportedSick ? <p className='-tip'>Sjukanmäld</p> : null }
                            {
                                this.isReportedSick(candidate.shiftReports)
                                ?
                                <div className="sick-reported-shifts">
                                    <p className={"-tip"}>Sjukanmälda skift:</p>
                                    {
                                        sickReportedShifts.map((shift, index) => {
                                            return (
                                                <div key={index} className="-shift-date">
                                                    { this.formatDate(shift.originalFromTime) }
                                                    <span>, </span>
                                                    <strong>
                                                        {
                                                            shift.originalFromTime
                                                            ?
                                                            moment(shift.originalFromTime).format('HH:mm')
                                                            :
                                                            ""
                                                        }
                                                        <span> – </span>
                                                        {
                                                            shift.originalToTime
                                                            ?
                                                            moment(shift.originalToTime).format('HH:mm')
                                                            :
                                                            ""
                                                        }
                                                    </strong>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                null
                            }

                            <div className="candidate-name">{candidate.firstName} {candidate.lastName}</div>
                            <div className="candidate-completed-jobs">
                                Slutförda Instajobs: <span>{candidate.completedJobs}</span>
                                {
                                    showReviewButton
                                    ?
                                    <Link to={`/dashboard/review/candidate/${candidate.id}`} className="review-link">Ge ett omdöme</Link>
                                    :
                                    null
                                }
                            </div>
                            <div className="candidate-avg-rating">
                                <div className="rating-text">Tidigare omdömen:</div>
                                <div className="rating">
                                    <StarRating rate={false} rating={candidate.averageReviewRating} displayValue={ Math.round(10 * candidate.averageReviewRating)/10 } />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    selectedCandidate ?
                    <CandidateDetail {...this.props} />
                    :
                    null
                }
            </div>
        );
    }
}

export default CandidatesListItem;
