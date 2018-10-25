import { connect } from 'react-redux';

import { signUp } from '../actions/signup.js';
import SignUpForm from '../components/SignUpForm.jsx';

const mapStateToProps = state => {
    return {
        requested: state.getIn(['auth', 'signupRequested']),
        success: state.getIn(['auth', 'signupSuccess']),
        failed: state.getIn(['auth', 'signupFailed']),
        failedMessage: state.getIn(['auth', 'signupFailedMessage'])
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp (userInfo) {
            dispatch(signUp(userInfo));
        }
    };
};

const SignUpFormContainer = connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

export default SignUpFormContainer;
