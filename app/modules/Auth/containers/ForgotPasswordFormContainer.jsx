import { connect } from 'react-redux';

import { forgotPassword } from '../actions/forgotPassword.js';
import ForgotPasswordForm from '../components/ForgotPasswordForm.jsx';

const mapStateToProps = state => {
    return {
        requested: state.getIn(['auth', 'isFetching']),
        success: state.getIn(['auth', 'forgotPasswordSuccess']),
        failedMessage: state.getIn(['auth', 'errorMessage'])
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword (email) {
            dispatch(forgotPassword(email));
        }
    };
};

const ForgotPasswordFormContainer = connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);

export default ForgotPasswordFormContainer;
