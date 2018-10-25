import React, { Component } from 'react';

import StarRating from 'components/StarRating';

import CandidateReviewItem from './CandidateReviewItem.jsx';

import '../less/CandidateReviews.less';

class CandidateReviews extends Component {
    render() {
        const { reviews, reviewNumberString, averageReviewRating } = this.props;

        return (
            <div className="candidate-reviews" id="reviews">
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="sec-title">{reviewNumberString}</h3>
                    </div>
                    <div className="text-right col-md-6">
                        <StarRating rate={false} rating={averageReviewRating} displayValue={ Math.round(10 * averageReviewRating)/10 } />
                    </div>
                </div>
                <hr className="hr-separator-2 no-top-margin" />
                {
                    reviews.map((review, index) => {
                        return (<CandidateReviewItem review={review} key={index} />)
                    })
                }

            </div>
        )
    }
}

export default CandidateReviews;
