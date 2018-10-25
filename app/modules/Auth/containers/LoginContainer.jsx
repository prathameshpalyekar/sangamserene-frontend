import { connect } from 'react-redux';

import Login from '../views/Login.jsx';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
        isVerifyingLogin: state.getIn(['auth', 'isVerifyingLogin']),
        isFetching: state.getIn(['auth', 'isFetching']),
        errorMessage: state.getIn(['auth', 'errorMessage']),
    };
};

const LoginContainer = connect(mapStateToProps)(Login);

export default LoginContainer;
