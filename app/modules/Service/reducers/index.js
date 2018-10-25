import { Map } from 'immutable';
import {
    UPDATE_SERVICES
} from '../actions/actionTypes.js';

const initialState = Map({
    data: []
});

function serviceReducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_SERVICES:
            return state.set('data', action.services);
        default:
            return state;
    }
}

export default serviceReducer;
