import Immutable from 'immutable';

import {
    HOLIDAYS_REQUEST,
    HOLIDAYS_SUCCESS,
    HOLIDAYS_FAILURE,
} from '../actions/actionTypes';


const initialState = Immutable.fromJS({
    fetching: false,
    fetched: true,
    errorMessage: '',

    data: [],
    lastUpdated: null
});

function holidaysReducer(state = initialState, action = {}) {
    switch (action.type)  {
        case HOLIDAYS_REQUEST:
            return state.merge({
                fetching: true,
                fetched: false,
                errorMessage: '',
            });
        case HOLIDAYS_SUCCESS:
            return state.merge({
                fetching: false,
                fetched: true,
                data: action.holidays,
                lastUpdated: new Date()
            });
        case HOLIDAYS_FAILURE:
            return state.merge({
                fetching: false,
                fetched: false,
                errorMessage: action.message,
            });
        default:
            return state;
    }
}

export default holidaysReducer;

