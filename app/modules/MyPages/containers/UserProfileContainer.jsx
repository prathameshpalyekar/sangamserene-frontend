import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import UserProfile from '../components/UserProfile.jsx';
import { updateProfile, updateUserAvatar } from '../actions/updateProfile.js';

const mapStateToProps = (state, ownProps) => {

    return {
        isFetching: state.getIn(['myPage','isFetching']),
        errorMessage: state.getIn(['myPage','errorMessage']),
        updateProfileSuccess: state.getIn(['myPage','updateProfileSuccess']),
        user: state.getIn(['auth', 'user']),
        fetchingAvatarSuccess: state.getIn(['myPage','fetchingAvatarSuccess']),
        fetchingAvatarError: state.getIn(['myPage','fetchingAvatarError']),
        isFetchingAvatar: state.getIn(['myPage','isFetchingAvatar']),
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        updateProfile (userId, userInfo) {
            dispatch(updateProfile(userId, userInfo));
        },
        profileUpdated (state) {
            dispatch(push({
                pathname: state.pathname,
                state: {
                    candidateId: state.candidateId
                }
            }));
        },
        updateUserAvatar (userId, file) {
            dispatch(updateUserAvatar(userId, file));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
