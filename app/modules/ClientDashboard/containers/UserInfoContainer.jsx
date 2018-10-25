import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserInfo from '../components/UserInfo.jsx';

const mapStateToProps = state => {
    return {
        user: state.getIn(['auth', 'user']),
    };
};

export default connect(mapStateToProps)(UserInfo);
