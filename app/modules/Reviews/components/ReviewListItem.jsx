import React, { Component } from 'react';
import cx from 'classnames';
import moment from 'moment';

import StarRating from 'components/StarRating';
import CandidateDetail from '../../Candidates/containers/CandidateDetailContainer.jsx';

import '../../Candidates/less/CandidateListItem.less';

class CandidatesListItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { candidate, selectedCandidate, moveViewProfileArrows, review } = this.props;

        const classNames = cx('', {
            'selected': selectedCandidate,
            'job-candidates-list-item': true,
            '-clickable': true,
            'profile-popup-on': moveViewProfileArrows
        });
        const reviewCreatedAt = review.get('createdAt');
        const reviewAgoDuration = moment.duration(moment().diff(moment(reviewCreatedAt)));
        const reviewDateString = reviewAgoDuration.asMonths() > 1 ? moment(reviewCreatedAt).format('DD MMM YYYY') : reviewAgoDuration.humanize();

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
                            <div className="candidate-name">{candidate.firstName} {candidate.lastName}</div>
                            <div className="review-date">{reviewDateString}</div>
                        </div>
                        <div className="col-md-12">
                            <div className="candidate-avg-rating">
                                <div className="rating">
                                    <StarRating rate={false} rating={review.get('rating')} />
                                </div>
                            </div>
                            <p className="review-text">{review.get('text')}</p>
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
