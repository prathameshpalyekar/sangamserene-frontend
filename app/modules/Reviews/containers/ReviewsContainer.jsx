import { connect } from 'react-redux';

import Reviews from '../views/Reviews.jsx';

import { fetchReviews } from '../actions/list.js';

const mapStateToProps = (state, ownProps) => {
    const loggedUser = state.getIn(['auth', 'user']);
    const reviewsState = state.get('reviews');
    return {
        loggedUser,
        reviews: reviewsState.get('reviews'),
        averageReviewRating: reviewsState.get('averageReviewRating'),
        isFetching: reviewsState.get('isFetching'),
        errorMessage: reviewsState.get('errorMessage'),
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchReviews (employerId) {
            dispatch(fetchReviews(employerId));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
