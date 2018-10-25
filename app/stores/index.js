import { createStore, applyMiddleware, compose } from 'redux';
import { Immutable } from 'immutable';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import DevTools from '../components/DevTools/index.js';

import rootReducer from '../reducers/index.js';

module.exports = function configureStore(initialState, history) {
    const middlewares = [
        routerMiddleware(history),
        thunk
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const enhancer = composeEnhancers(
        applyMiddleware(...middlewares),
    );

    const store = createStore(rootReducer, initialState, enhancer);
    return store;
}
