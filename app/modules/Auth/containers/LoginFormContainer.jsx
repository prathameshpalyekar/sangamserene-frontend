import { connect } from 'react-redux';

import { login } from '../actions/login.js';
import LoginForm from '../components/LoginForm.jsx';
import Config from '../../../config';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
        isFetching: state.getIn(['auth', 'isFetching']),
        errorMessage: state.getIn(['auth', 'errorMessage']),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login (data) {
            dispatch(login(data));
        },
    };
};


const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default LoginFormContainer;
