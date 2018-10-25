import Immutable from 'immutable';

import {
    REVIEWS_REQUEST,
    REVIEWS_SUCCESS,
    REVIEWS_FAILURE,
} from '../actions/actionTypes.js';

const reviews = (state = Immutable.fromJS({
    isFetching: false,
    reviews: {},
}), action = {}) => {
    switch (action.type) {
        case REVIEWS_REQUEST:
            return state.set('isFetching', true).set('errorMessage', '');
        case REVIEWS_SUCCESS:
            return state.set('isFetching', false).set('errorMessage', '')
                .set('reviews', Immutable.fromJS(action.reviews.reviews))
                .set('averageReviewRating', action.reviews.averageReviewRating);
        case REVIEWS_FAILURE:
            return state.set('isFetching', false).set('errorMessage', action.message);
        default:
            return state;
    }
}

export default reviews;
