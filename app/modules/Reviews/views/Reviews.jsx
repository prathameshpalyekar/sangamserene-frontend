import React, { Component } from 'react';
import Alert from 'react-s-alert';

import StarRating from 'components/StarRating';
import Loader from 'components/Loader';

import ReviewListItemContainer from '../containers/ReviewListItemContainer.jsx';

import '../less/Reviews.less';

class Reviews extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedCandidate: null,
        };
        this.viewCandidate = this.viewCandidate.bind(this);
    }

    componentDidMount () {
        const { loggedUser } = this.props;
        this.props.fetchReviews(loggedUser.get('id'));
    }

    componentWillReceiveProps(nextProps) {
        if ((!nextProps.isFetching) && nextProps.errorMessage) {
            Alert.error(nextProps.errorMessage);
            return false;
        }
    }

    viewCandidate(candidate) {
        this.setState({selectedCandidate: this.state.selectedCandidate === candidate.id ? null : candidate.id})
    }

    render() {
        const { reviews = {}, isFetching, averageReviewRating = 0 } = this.props;
        const { selectedCandidate } = this.state;

        if (isFetching) {
            return (
                <Loader />
            );
        }

        return (
            <div className="">
                <div className="whiteboard-header">
                    <h1 className="whiteboard-title">
                        Mina omdömen
                    </h1>
                </div>
                <div className="avg-rating-wrap text-center">
                    <span className="avg-rating-txt">{`${reviews.size ? reviews.size : 0} ${reviews.size === 1 ? 'Omdöme' : 'Omdömen'}`}</span>
                    <StarRating rate={false} rating={averageReviewRating} displayValue={ Math.round(10 * averageReviewRating)/10 } />
                </div>
                {
                reviews && reviews.size
                ?
                    (reviews || []).map((review, i) => {
                        const candidateObj = review.get('employee').toJS();
                        return (
                            <ReviewListItemContainer
                                viewCandidate={this.viewCandidate.bind(this, candidateObj)}
                                selectedCandidate={selectedCandidate === review.get('employeeId') ? candidateObj : null}
                                candidate={candidateObj}
                                review={review}
                                moveViewProfileArrows={selectedCandidate ? true : false}
                                key={i}
                            />
                        );
                    })
                :
                <div className="no-records-wrap">
                    <p>Just nu finns det inga omdömen</p>
                </div>
                }
            </div>
        )
    }
}

export default Reviews;
