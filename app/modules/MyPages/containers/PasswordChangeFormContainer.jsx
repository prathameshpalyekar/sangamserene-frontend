import { connect } from 'react-redux';

import PasswordChangeForm from '../components/PasswordChangeForm.jsx';

import { updatePassword } from '../actions/passwordChange.js';

const mapStateToProps = (state, ownProps) => {
    const passwordState = state.getIn(['myPage','password']);
    return {
        isFetching: passwordState.get('isFetching'),
        updateSuccess: passwordState.get('updateSuccess'),
        errorMessage: passwordState.get('errorMessage'),
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        updatePassword (data) {
            dispatch(updatePassword(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangeForm);
