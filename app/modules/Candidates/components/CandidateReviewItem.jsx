import React, { Component } from 'react';
import moment from 'moment';

import StarRating from 'components/StarRating';

class CandidateReviewItem extends Component {
    render() {
        const { review } = this.props;
        const { employer ={} } = review;
        const { employerInfo = {} } = employer;

        const reviewAgoDuration = moment.duration(moment().diff(moment(review.createdAt)));
        const reviewDateString = reviewAgoDuration.asMonths() > 1 ? moment(review.createdAt).format('DD MMM YYYY') : reviewAgoDuration.humanize();

        return (
            <div className="candidate-review-item" key={review.id}>
                <div className="row -head">
                    <div className="col-md-8 -title">
                        {employer.firstName} på {employerInfo.companyName}
                    </div>
                    <div className="col-md-4 -date text-right">
                        {reviewDateString}
                    </div>
                </div>
                <StarRating rate={false} rating={review.rating} displayValue={null} />
                <p className="sec-desc">{review.text}</p>
                <hr className="hr-separator-2" />
            </div>
        );
    }
}

export default CandidateReviewItem;
