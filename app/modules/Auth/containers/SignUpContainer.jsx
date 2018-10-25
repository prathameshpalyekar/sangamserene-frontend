import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignUp from '../views/SignUp.jsx';

const mapStateToProps = state => {
    // const currentView = state.getIn(['job', 'view', 'currentView']);

    return {
    };
};

const SignUpContainer = connect(mapStateToProps)(SignUp);

export default SignUpContainer;
