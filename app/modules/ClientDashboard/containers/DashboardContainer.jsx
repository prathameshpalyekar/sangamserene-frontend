import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dashboard from '../views/Dashboard.jsx';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
        isVerifyingLogin: state.getIn(['auth', 'isVerifyingLogin']),
    };
};

export default connect(mapStateToProps)(Dashboard);
