import React, { Component } from 'react';
import { connect } from 'react-redux';

import ForgotPassword from '../views/ForgotPassword.jsx';

const mapStateToProps = state => {
    return {
    };
};

const ForgotPasswordContainer = connect(mapStateToProps)(ForgotPassword);

export default ForgotPasswordContainer;
