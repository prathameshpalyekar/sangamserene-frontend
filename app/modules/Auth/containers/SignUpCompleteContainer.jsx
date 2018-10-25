import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignUpComplete from '../views/SignUpComplete.jsx';

const mapStateToProps = state => {
    // const currentView = state.getIn(['job', 'view', 'currentView']);

    return {
    };
};

const SignUpCompleteContainer = connect(mapStateToProps)(SignUpComplete);

export default SignUpCompleteContainer;
