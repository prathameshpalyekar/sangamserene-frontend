import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import Immutable from 'immutable';

import configureStore from './stores/index.js';
import Routes from './Routes.js';

import Alert from 'react-s-alert';

import './less/index.less';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const browserHistory = createBrowserHistory();

const store = configureStore(Immutable.Map(), browserHistory);

export default
        <Provider store={store}>
            <ConnectedRouter history={browserHistory}>
                <div>
                    <Routes />
                    <Alert stack={{limit: 3}} effect="slide" position="bottom-right" timeout={5000} />
                </div>
            </ConnectedRouter>
        </Provider>
