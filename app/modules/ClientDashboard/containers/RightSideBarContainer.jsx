import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import RightSideBar from '../views/RightSideBar.jsx';

const mapStateToProps = state => {

    return {
    };
};

export default withRouter(connect(mapStateToProps)(RightSideBar));
